const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = 'jssantos';
const PASSWORD = 'Dojppa2022';
const ROOT = path.join(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');
const MODULE = 'Parole and Pardon Investigation';
const ROUTE = 'parole-pardon-investigation-list';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForReady(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await sleep(1200);
}

async function collectControls(page) {
  return page.evaluate(() => {
    const visible = (el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    };
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const out = { buttons: [], fields: [], tables: [], tabs: [], modals: [] };
    document.querySelectorAll('button, .btn, input[type=button], input[type=submit]').forEach((el) => {
      if (!visible(el)) return;
      const value = clean(el.innerText || el.value || el.getAttribute('title') || el.getAttribute('aria-label'));
      if (value) out.buttons.push(value);
    });
    document.querySelectorAll('input, textarea, select').forEach((el) => {
      if (!visible(el) || (el.type || '').toLowerCase() === 'hidden') return;
      const label = clean(el.closest('.form-group')?.querySelector('label')?.textContent || el.getAttribute('placeholder') || el.name || el.id || el.className);
      if (label) out.fields.push(label);
    });
    document.querySelectorAll('table').forEach((table) => {
      if (!visible(table)) return;
      const headers = Array.from(table.querySelectorAll('thead th')).map((th) => clean(th.textContent)).filter(Boolean);
      out.tables.push(headers.slice(0, 8).join(', ') || 'Data table');
    });
    document.querySelectorAll('.modal.show, .modal').forEach((el) => {
      const label = clean(el.querySelector('.modal-title')?.textContent || el.id);
      if (label) out.modals.push(label);
    });
    for (const key of Object.keys(out)) out[key] = [...new Set(out[key].filter(Boolean))].slice(0, 12);
    return out;
  }).catch(() => ({}));
}

async function capture(page, filename, kind, name) {
  await waitForReady(page);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename), fullPage: true });
  return {
    module: MODULE,
    name,
    kind,
    filename,
    url: page.url(),
    controls: await collectControls(page),
  };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.setDefaultTimeout(12000);

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.locator('input.email').fill(USERNAME);
  await page.locator('input.password').fill(PASSWORD);
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/investigation_docketing|dashboard|parole-pardon/, { timeout: 25000 }).catch(() => {});
  await waitForReady(page);

  await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'load' });
  await waitForReady(page);

  const rowCount = await page.locator('table tbody tr').count().catch(() => 0);
  if (!rowCount) {
    console.log('No rows found on parole investigation list; skipping action captures.');
    await browser.close();
    return;
  }

  const catalog = JSON.parse(await fs.readFile(CATALOG_FILE, 'utf-8'));
  const newRecords = [];

  const actions = [
    ['082-parole-and-pardon-investigation-view-view.png', 'View', '.btn_view:visible'],
    ['083-parole-and-pardon-investigation-update-update.png', 'Update', '.btn_update:visible'],
    ['084-parole-and-pardon-investigation-attachments-attachments.png', 'Attachments', '.btn_attachments:visible, .btn_upload:visible'],
    ['085-parole-and-pardon-investigation-remove-confirmation-remove-confirmation.png', 'Remove confirmation', '.btn_remove:visible, .btn_delete:visible'],
  ];

  for (const [filename, kind, selector] of actions) {
    await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'load' });
    await waitForReady(page);
    const before = page.url();
    await page.locator(selector).first().click({ timeout: 8000 }).catch(() => {});
    await sleep(1800);
    const record = await capture(page, filename, kind, `${MODULE} ${kind === 'Remove confirmation' ? 'Remove confirmation' : kind}`);
    newRecords.push(record);
    console.log('CAPTURED', filename);

    const hasModal = await page.locator('.modal.show:visible').count().catch(() => 0);
    if (hasModal) {
      await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close').first().click({ timeout: 3000 }).catch(() => {});
      await sleep(700);
    } else if (page.url() !== before) {
      await page.goto(`${BASE_URL}${ROUTE}`, { waitUntil: 'load' }).catch(() => {});
      await waitForReady(page);
    }
  }

  const filtered = catalog.records.filter((record) => record.module !== MODULE || record.kind === 'list page');
  const listRecord = catalog.records.find((record) => record.module === MODULE && record.kind === 'list page');
  const insertAt = catalog.records.findIndex((record) => record.filename === listRecord.filename) + 1;
  catalog.records = [
    ...catalog.records.slice(0, insertAt),
    ...newRecords,
    ...catalog.records.slice(insertAt).filter((record) => !newRecords.some((nr) => nr.filename === record.filename)),
  ];
  // Rebuild cleanly: remove old parole investigation non-list entries then insert new
  catalog.records = catalog.records.filter(
    (record) => !(record.module === MODULE && record.kind !== 'list page')
  );
  const idx = catalog.records.findIndex((record) => record.module === MODULE && record.kind === 'list page');
  catalog.records.splice(idx + 1, 0, ...newRecords);

  await fs.writeFile(CATALOG_FILE, JSON.stringify(catalog, null, 2), 'utf-8');
  console.log(JSON.stringify({ captured: newRecords.length }, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
