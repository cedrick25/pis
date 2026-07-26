const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = 'jssantos';
const PASSWORD = 'Dojppa2022';
const ROOT = path.join(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');
const MODULE = 'Fact Sheet Probation';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForReady(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await sleep(1500);
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
    document.querySelectorAll('button, .btn, input[type=button], input[type=submit], a.btn').forEach((el) => {
      if (!visible(el)) return;
      const value = clean(el.innerText || el.value || el.getAttribute('title') || el.getAttribute('aria-label'));
      if (value) out.buttons.push(value);
    });
    document.querySelectorAll('input, textarea, select').forEach((el) => {
      if (!visible(el) || (el.type || '').toLowerCase() === 'hidden') return;
      const label = clean(
        el.closest('.form-group')?.querySelector('label')?.textContent
          || el.getAttribute('placeholder')
          || el.name
          || el.id
          || el.className
      );
      if (label) out.fields.push(label);
    });
    document.querySelectorAll('table').forEach((table) => {
      if (!visible(table)) return;
      const headers = Array.from(table.querySelectorAll('thead th')).map((th) => clean(th.textContent)).filter(Boolean);
      out.tables.push(headers.slice(0, 8).join(', ') || 'Data table');
    });
    document.querySelectorAll('.nav-tabs .nav-link, [role=tab]').forEach((el) => {
      if (visible(el)) out.tabs.push(clean(el.textContent));
    });
    document.querySelectorAll('.modal.show, .modal').forEach((el) => {
      const label = clean(el.querySelector('.modal-title')?.textContent || el.id);
      if (label) out.modals.push(label);
    });
    for (const key of Object.keys(out)) out[key] = [...new Set(out[key].filter(Boolean))].slice(0, 16);
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
  page.setDefaultTimeout(15000);

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.locator('input.email').fill(USERNAME);
  await page.locator('input.password').fill(PASSWORD);
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/investigation_docketing|dashboard|client_list/, { timeout: 25000 }).catch(() => {});
  await waitForReady(page);

  await page.goto(`${BASE_URL}client_list`, { waitUntil: 'load' });
  await waitForReady(page);
  await page.waitForSelector('#tblProbationClientList tbody tr a.text-primary', { timeout: 20000 }).catch(() => {});

  const nameLink = page.locator('#tblProbationClientList tbody tr a.text-primary').first();
  const hasClient = (await nameLink.count().catch(() => 0)) > 0;
  if (!hasClient) {
    console.log('No probation clients found; skipping profile captures.');
    await browser.close();
    return;
  }

  const catalog = JSON.parse(await fs.readFile(CATALOG_FILE, 'utf-8'));
  const newRecords = [];

  const listShot = await capture(
    page,
    '076-fact-sheet-probation-open-client-name.png',
    'open client name',
    'Fact Sheet Probation open client name'
  );
  newRecords.push(listShot);

  await nameLink.click({ timeout: 8000 });
  await page.waitForURL(/client_view_factsheet/, { timeout: 20000 }).catch(() => {});
  await waitForReady(page);
  await page.waitForSelector('#investigationTab', { timeout: 15000 }).catch(() => {});

  newRecords.push(
    await capture(
      page,
      '077-fact-sheet-probation-client-profile.png',
      'client profile',
      'Fact Sheet Probation client profile'
    )
  );

  await page.locator('[data-target="#uploadPicModal"], .btn-photo').first().click({ timeout: 5000 }).catch(() => {});
  await sleep(800);
  newRecords.push(
    await capture(
      page,
      '078-fact-sheet-probation-upload-photo.png',
      'upload photo',
      'Fact Sheet Probation upload photo'
    )
  );
  await page.locator('#uploadPicModal .close, #dismissedModalUploadPic').first().click({ timeout: 3000 }).catch(() => {});
  await sleep(500);

  await page.locator('[data-target="#cameraModal"], .btn-take').first().click({ timeout: 5000 }).catch(() => {});
  await sleep(800);
  newRecords.push(
    await capture(
      page,
      '079-fact-sheet-probation-take-photo.png',
      'take photo',
      'Fact Sheet Probation take photo'
    )
  );
  await page.locator('#cameraModal .close, #cancel_modal').first().click({ timeout: 3000 }).catch(() => {});
  await sleep(500);

  await page.locator('.btn-fingerprint').first().click({ timeout: 5000 }).catch(() => {});
  await sleep(800);
  newRecords.push(
    await capture(
      page,
      '080-fact-sheet-probation-upload-fingerprint.png',
      'upload fingerprint',
      'Fact Sheet Probation upload fingerprint'
    )
  );

  const newFilenames = new Set(newRecords.map((r) => r.filename));
  const insertAt =
    catalog.records.findIndex((r) => r.module === MODULE && r.kind === 'list page') + 1;
  const kept = catalog.records.filter((r) => !(r.module === MODULE && newFilenames.has(r.filename)));
  catalog.records = [
    ...kept.slice(0, insertAt),
    ...newRecords,
    ...kept.slice(insertAt),
  ];

  await fs.writeFile(CATALOG_FILE, JSON.stringify(catalog, null, 2), 'utf-8');
  console.log(JSON.stringify({ captured: newRecords.length }, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
