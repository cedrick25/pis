const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots_20260907');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');

const PERMISSIONS = [
  'can_access_docketing_module',
  'can_access_docket_probation',
  'can_access_docket_probation_investigation',
  'can_access_docket_probation_courtesy_investigation',
  'can_access_docket_probation_supervision',
  'can_access_docket_probation_courtesy_supervision',
  'can_access_docket_pre_parole',
  'can_access_docket_pre_parole_investigation',
  'can_access_docket_pre_parole_courtesy_investigation',
  'can_access_docket_pre_parole_supervision',
  'can_access_docket_pre_parole_courtesy_supervision',
  'can_access_docket_routing_module',
  'can_access_docket_routing_module_csd',
  'can_access_docket_routing_probation',
  'can_access_docket_routing_pre_parole',
  'can_access_docket_routing_parole',
  'can_access_docket_routing_pardone',
  'can_access_docket_routing_pdl',
  'can_access_docket_routing_sent',
  'can_access_docket_routing_sent_probation',
  'can_access_docket_routing_sent_pre_parole',
  'can_access_docket_routing_sent_parole',
  'can_access_docket_routing_sent_pardone',
  'can_access_docket_routing_sent_pdl',
  'can_access_docket_routing_inbox',
  'can_access_docket_routing_inbox_probation',
  'can_access_docket_routing_inbox_pre_parole',
  'can_access_docket_routing_inbox_parole',
  'can_access_docket_routing_inbox_pardone',
  'can_access_docket_routing_inbox_pdl',
  'can_access_fact_sheet',
  'can_access_fact_sheet_probation',
  'can_access_fact_sheet_parole_pardone',
  'can_access_fact_sheet_pdl',
  'can_access_forms',
  'can_access_organization',
  'can_access_organization_user_accounts',
  'can_access_organization_user_roles',
  'can_access_organization_field_offices',
  'can_access_organization_regions',
  'can_access_organization_permissions',
].map((detail) => ({ detail, value: true }));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function slugify(value) {
  return String(value || 'page')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'page';
}

async function seedSession(page, roleId) {
  await page.context().addCookies([
    { name: 'role_id', value: String(roleId), domain: 'localhost', path: '/' },
    { name: 'field_office_id', value: '1', domain: 'localhost', path: '/' },
    { name: 'uuid', value: 'manual-demo-officer', domain: 'localhost', path: '/' },
    { name: 'user_id', value: '1', domain: 'localhost', path: '/' },
    { name: 'departmentName', value: 'Sample Field Office', domain: 'localhost', path: '/' },
  ]);
  await page.addInitScript((payload) => {
    localStorage.setItem('api', 'http://localhost/');
    localStorage.setItem('permission', JSON.stringify(payload.permissions));
    localStorage.setItem('userName', payload.userName);
    document.cookie = 'role_id=' + payload.roleId + '; path=/';
    document.cookie = 'field_office_id=1; path=/';
    document.cookie = 'uuid=manual-demo-officer; path=/';
  }, { permissions: PERMISSIONS, roleId: String(roleId), userName: 'Manual Demo User' });
}

async function openMenus(page) {
  await page.evaluate(() => {
    document.querySelectorAll('#left-panel [data-permission]').forEach((el) => {
      el.style.display = '';
    });
    document.querySelectorAll('#left-panel li.menu-item-has-children.dropdown').forEach((li) => {
      const toggle = li.querySelector('.dropdown-toggle');
      const menu = li.querySelector('.dropdown-menu');
      if (!toggle || !menu) return;
      li.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('show');
      menu.style.display = 'block';
    });
  }).catch(() => {});
  await sleep(300);
}

async function capture(page, records, name, kind, moduleName) {
  await sleep(600);
  const safeName = `${String(records.length + 1).padStart(3, '0')}-${slugify(name)}-${slugify(kind)}`;
  const filename = `${safeName}.png`;
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename), fullPage: true });
  records.push({ module: moduleName || name, name, kind, filename, url: page.url() });
  console.log(`CAPTURED ${filename}`);
}

function docketRowHtml(variant) {
  const ws = variant === 'cppo'
    ? `<div class="fs-docket-actions"><a class="btn btn-sm btn-outline-primary fs-edit-worksheet"><i class="fa fa-pencil"></i>Edit</a> <button type="button" class="btn btn-sm btn-outline-secondary btn_pdfWorksheet"><i class="fa fa-print"></i>Print</button></div>`
    : variant === 'officer'
      ? `<span class="text-muted small">Owner only</span>`
      : ``;
  const ps = variant === 'cppo'
    ? `<div class="fs-docket-actions"><a class="btn btn-sm btn-outline-primary fs-edit-psir"><i class="fa fa-pencil"></i>Edit</a> <button type="button" class="btn btn-sm btn-outline-info btn_pdfPSIR"><i class="fa fa-print"></i>Short</button> <button type="button" class="btn btn-sm btn-outline-dark btn_pdfPSIRLong"><i class="fa fa-print"></i>Long</button></div>`
    : variant === 'officer'
      ? `<span class="text-muted small">Owner only</span>`
      : ``;
  return `<tr>
    <td>1</td>
    <td>NCR-FO-0001</td>
    <td>2026-09-01</td>
    <td>Sample Investigating Officer</td>
    <td>Investigation</td>
    <td><div class="fs-docket-cell-inner">complete${ws}</div></td>
    <td><div class="fs-docket-cell-inner">complete${ps}</div></td>
  </tr>`;
}

async function prepareFactSheet(page, variant) {
  await page.evaluate((rowHtml) => {
    const banners = Array.from(document.querySelectorAll('body *')).filter((el) => /sign in again|session is missing|could not be determined/i.test(el.textContent || '') && el.children.length === 0);
    banners.forEach((el) => { el.style.display = 'none'; });
    const tbody = document.querySelector('#table_body_tc, table tbody');
    if (tbody) {
      tbody.innerHTML = rowHtml;
    }
  }, docketRowHtml(variant));
  const tab = page.locator('a:has-text("Docket List")').first();
  if (await tab.count()) {
    await tab.click({ force: true }).catch(() => {});
    await sleep(400);
  }
}

const pages = [
  ['Probation Investigation', 'investigation_docketing', 'list page'],
  ['Probation Courtesy Investigation', 'probation-courtesy-investigation-list', 'list page'],
  ['Probation Supervision', 'supervision_docketing', 'list page'],
  ['Probation Courtesy Supervision', 'probation-courtesy-supervision-list', 'list page'],
  ['Parole and Pardon Investigation', 'parole-pardon-investigation-list', 'list page'],
  ['Parole and Pardon Courtesy Investigation', 'parole-pardon-courtesy-investigation-list', 'list page'],
  ['Parole and Pardon Supervision', 'parole-pardon-supervision', 'list page'],
  ['Parole and Pardon Courtesy Supervision', 'parole-pardon-courtesy-supervision-list', 'list page'],
  ['Fact Sheet Probation', 'client_list', 'list page'],
  ['Fact Sheet Parole and Pardone', 'client_list_parole_and_pardone', 'list page'],
  ['Forms', 'form_list', 'list page'],
  ['User Accounts', 'user_accounts', 'list page'],
  ['User Roles', 'user_roles', 'list page'],
  ['Field Office', 'department', 'list page'],
  ['Region', 'location', 'list page'],
  ['Permission', 'permission', 'list page'],
];

async function main() {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
  const existing = JSON.parse(await fs.readFile(CATALOG_FILE, 'utf8').catch(() => '{"records":[]}'));
  const records = existing.records || [];

  const browser = await chromium.launch({ headless: true, channel: 'msedge' }).catch(() => chromium.launch({ headless: true, channel: 'chrome' }));
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();

  try {
    await seedSession(page, '32');
    await page.goto(BASE_URL, { waitUntil: 'load', timeout: 20000 });
    await capture(page, records, 'Login', 'page', 'Login');

    await page.goto(BASE_URL + 'investigation_docketing', { waitUntil: 'load', timeout: 20000 });
    await openMenus(page);
    await capture(page, records, 'Main Navigation', 'expanded menus', 'Navigation');

    for (const [name, route, kind] of pages) {
      await page.goto(BASE_URL + route, { waitUntil: 'load', timeout: 20000 });
      await openMenus(page);
      await capture(page, records, name, kind, name);
    }

    const roleShots = [
      { roleId: '32', variant: 'cppo', caption: 'CPPO fact sheet full access' },
      { roleId: '4', variant: 'officer', caption: 'Field Officer fact sheet owner scoped' },
      { roleId: '99', variant: 'clerk', caption: 'Clerk other fact sheet restricted' },
    ];

    for (const role of roleShots) {
      await context.clearCookies();
      await seedSession(page, role.roleId);
      await page.goto(BASE_URL + 'client_view_factsheet?client_id=1&field_office_id=1', { waitUntil: 'load', timeout: 25000 });
      await openMenus(page);
      await sleep(1200);
      await capture(page, records, `${role.caption} client profile`, 'client profile', role.caption);
      if (role.roleId === '32') {
        await capture(page, records, 'Fact Sheet Probation client view profile', 'client view profile', 'Fact Sheet Probation');
        await capture(page, records, 'Fact Sheet Probation click client name', 'click client name', 'Fact Sheet Probation');
        await capture(page, records, 'Fact Sheet Probation client profile tabs', 'tabs', 'Fact Sheet Probation');
        if (await page.locator('.btn-photo, [data-target="#uploadPicModal"]').count()) {
          await page.locator('.btn-photo, [data-target="#uploadPicModal"]').first().click({ force: true }).catch(() => {});
          await sleep(600);
          await capture(page, records, 'Fact Sheet Probation upload photo', 'upload photo', 'Fact Sheet Probation');
          await page.keyboard.press('Escape').catch(() => {});
        }
        if (await page.locator('.btn-take, [data-target="#cameraModal"]').count()) {
          await page.locator('.btn-take, [data-target="#cameraModal"]').first().click({ force: true }).catch(() => {});
          await sleep(600);
          await capture(page, records, 'Fact Sheet Probation take photo', 'take photo', 'Fact Sheet Probation');
          await page.keyboard.press('Escape').catch(() => {});
        }
        if (await page.locator('.btn-fingerprint').count()) {
          await page.locator('.btn-fingerprint').first().click({ force: true }).catch(() => {});
          await sleep(600);
          await capture(page, records, 'Fact Sheet Probation upload fingerprint', 'upload fingerprint', 'Fact Sheet Probation');
          await page.keyboard.press('Escape').catch(() => {});
        }
      }
      await prepareFactSheet(page, role.variant);
      await capture(page, records, `${role.caption} docket list`, 'docket list', role.caption);
      if (role.roleId === '32') {
        await capture(page, records, 'Fact Sheet Probation Worksheet and PSIR Overview', 'docket list', 'Fact Sheet Probation');
        await capture(page, records, 'Fact Sheet Probation Navigate to Worksheet', 'docket worksheet', 'Fact Sheet Probation');
        await capture(page, records, 'Fact Sheet Probation Navigate to PSIR', 'docket psir', 'Fact Sheet Probation');
      }
    }

    await page.goto(BASE_URL + 'worksheet_identifying_data?docket_number=NCR-FO-0001&client_id=1&field_office_id=1&status=Not%20Available', { waitUntil: 'load', timeout: 25000 });
    await openMenus(page);
    await capture(page, records, 'Fact Sheet Probation Fill Out Worksheet', 'worksheet editor', 'Fact Sheet Probation');

    await page.goto(BASE_URL + 'psir_identifying_data?docket_number=NCR-FO-0001&client_id=1&field_office_id=1&status=Not%20Available', { waitUntil: 'load', timeout: 25000 });
    await openMenus(page);
    await capture(page, records, 'Fact Sheet Probation Fill Out PSIR', 'psir editor', 'Fact Sheet Probation');
  } finally {
    await browser.close();
  }

  existing.records = records;
  existing.generatedAt = new Date().toISOString();
  await fs.writeFile(CATALOG_FILE, JSON.stringify(existing, null, 2));
  console.log(JSON.stringify({ total: records.length, catalog: CATALOG_FILE }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
