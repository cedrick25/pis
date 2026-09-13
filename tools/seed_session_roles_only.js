const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots_20260907');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');

const PERMISSIONS = [
  'can_access_fact_sheet', 'can_access_fact_sheet_probation', 'can_access_docketing_module',
  'can_access_docket_probation', 'can_access_docket_probation_investigation',
].map((detail) => ({ detail, value: true }));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const slugify = (value) => String(value || 'page').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 90) || 'page';

function docketRowHtml(variant) {
  const ws = variant === 'cppo'
    ? `<div class="fs-docket-actions"><a class="btn btn-sm btn-outline-primary"><i class="fa fa-pencil"></i>Edit</a> <button type="button" class="btn btn-sm btn-outline-secondary"><i class="fa fa-print"></i>Print</button></div>`
    : variant === 'officer'
      ? `<span class="text-muted small">Owner only</span>`
      : ``;
  const ps = variant === 'cppo'
    ? `<div class="fs-docket-actions"><a class="btn btn-sm btn-outline-primary"><i class="fa fa-pencil"></i>Edit</a> <button type="button" class="btn btn-sm btn-outline-info"><i class="fa fa-print"></i>Short</button> <button type="button" class="btn btn-sm btn-outline-dark"><i class="fa fa-print"></i>Long</button></div>`
    : variant === 'officer'
      ? `<span class="text-muted small">Owner only</span>`
      : ``;
  return `<tr><td>1</td><td>NCR-FO-0001</td><td>2026-09-01</td><td>Sample Investigating Officer</td><td>Investigation</td><td><div class="fs-docket-cell-inner">complete${ws}</div></td><td><div class="fs-docket-cell-inner">complete${ps}</div></td></tr>`;
}

async function seed(page, roleId) {
  await page.context().addCookies([
    { name: 'role_id', value: String(roleId), domain: 'localhost', path: '/' },
    { name: 'field_office_id', value: '1', domain: 'localhost', path: '/' },
    { name: 'uuid', value: 'manual-demo-officer', domain: 'localhost', path: '/' },
  ]);
  await page.addInitScript((payload) => {
    localStorage.setItem('api', 'http://localhost/');
    localStorage.setItem('permission', JSON.stringify(payload.permissions));
    localStorage.setItem('userName', 'Manual Demo User');
  }, { permissions: PERMISSIONS, roleId: String(roleId) });
}

async function capture(page, records, name, kind, moduleName) {
  await sleep(500);
  const filename = `${String(records.length + 1).padStart(3, '0')}-${slugify(name)}-${slugify(kind)}.png`;
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename), fullPage: false });
  records.push({ module: moduleName || name, name, kind, filename, url: page.url() });
  console.log('CAPTURED', filename);
}

(async () => {
  const existing = JSON.parse(await fs.readFile(CATALOG_FILE, 'utf8'));
  const records = existing.records || [];
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  try {
    for (const role of [
      { roleId: '32', variant: 'cppo', caption: 'CPPO fact sheet full access' },
      { roleId: '4', variant: 'officer', caption: 'Field Officer fact sheet owner scoped' },
      { roleId: '99', variant: 'clerk', caption: 'Clerk other fact sheet restricted' },
    ]) {
      await context.clearCookies();
      await seed(page, role.roleId);
      await page.goto(BASE_URL + 'client_view_factsheet?client_id=1&field_office_id=1', { waitUntil: 'domcontentloaded', timeout: 25000 });
      await sleep(1500);
      await capture(page, records, `${role.caption} client profile`, 'client profile', role.caption);
      if (role.roleId === '32' && await page.locator('.btn-fingerprint').count()) {
        await page.locator('.btn-fingerprint').first().click({ force: true }).catch(() => {});
        await sleep(500);
        await capture(page, records, 'Fact Sheet Probation upload fingerprint', 'upload fingerprint', 'Fact Sheet Probation');
        await page.keyboard.press('Escape').catch(() => {});
      }
      await page.evaluate((html) => {
        const tbody = document.querySelector('#table_body_tc, .table_body_tc, table tbody');
        if (tbody) tbody.innerHTML = html;
        document.querySelectorAll('a').forEach((a) => {
          if (/docket list/i.test(a.textContent || '')) a.click();
        });
      }, docketRowHtml(role.variant));
      await sleep(400);
      await capture(page, records, `${role.caption} docket list`, 'docket list', role.caption);
      if (role.roleId === '32') {
        await capture(page, records, 'Fact Sheet Probation Worksheet and PSIR Overview', 'docket list', 'Fact Sheet Probation');
        await capture(page, records, 'Fact Sheet Probation Navigate to Worksheet', 'docket worksheet', 'Fact Sheet Probation');
        await capture(page, records, 'Fact Sheet Probation Navigate to PSIR', 'docket psir', 'Fact Sheet Probation');
      }
    }
    await page.goto(BASE_URL + 'worksheet_identifying_data?docket_number=NCR-FO-0001&client_id=1&field_office_id=1&status=Not%20Available', { waitUntil: 'domcontentloaded', timeout: 25000 });
    await sleep(1000);
    await capture(page, records, 'Fact Sheet Probation Fill Out Worksheet', 'worksheet editor', 'Fact Sheet Probation');
    await page.goto(BASE_URL + 'psir_identifying_data?docket_number=NCR-FO-0001&client_id=1&field_office_id=1&status=Not%20Available', { waitUntil: 'domcontentloaded', timeout: 25000 });
    await sleep(1000);
    await capture(page, records, 'Fact Sheet Probation Fill Out PSIR', 'psir editor', 'Fact Sheet Probation');
  } finally {
    await browser.close();
  }
  existing.records = records;
  existing.generatedAt = new Date().toISOString();
  await fs.writeFile(CATALOG_FILE, JSON.stringify(existing, null, 2));
  console.log(JSON.stringify({ total: records.length }, null, 2));
})();
