const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = 'jssantos';
const PASSWORD = 'Dojppa2022';
const ROOT = path.join(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');

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
    document.querySelectorAll('button, .btn, input[type=button], input[type=submit]').forEach((el) => {
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

async function capture(page, module, filename, kind, name) {
  await waitForReady(page);
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename), fullPage: true });
  return { module, name, kind, filename, url: page.url(), controls: await collectControls(page) };
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.locator('input.email').fill(USERNAME);
  await page.locator('input.password').fill(PASSWORD);
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/investigation_docketing|dashboard|client_list/, { timeout: 25000 }).catch(() => {});
  await waitForReady(page);
}

function mergeCatalog(catalog, newRecords) {
  const byFilename = new Set(newRecords.map((r) => r.filename));
  const kept = catalog.records.filter((r) => !byFilename.has(r.filename));
  const paroleCreate = newRecords.filter((r) => r.module === 'Fact Sheet Parole and Pardone');
  const pdlActions = newRecords.filter((r) => r.module === 'Fact Sheet PDL');

  let records = kept;
  if (paroleCreate.length) {
    const idx = records.findIndex((r) => r.module === 'Fact Sheet Parole and Pardone' && r.kind === 'list page');
    records = [...records.slice(0, idx + 1), ...paroleCreate, ...records.slice(idx + 1)];
  }
  if (pdlActions.length) {
    const idx = records.findIndex((r) => r.module === 'Fact Sheet PDL' && r.kind === 'list page');
    const insertAt = idx >= 0 ? idx + 1 : records.length;
    const withoutOldPdl = records.filter(
      (r) => !(r.module === 'Fact Sheet PDL' && ['View', 'Update', 'Attachments'].includes(r.kind))
    );
    const pdlListIdx = withoutOldPdl.findIndex((r) => r.module === 'Fact Sheet PDL' && r.kind === 'list page');
    records = [
      ...withoutOldPdl.slice(0, pdlListIdx + 1),
      ...pdlActions,
      ...withoutOldPdl.slice(pdlListIdx + 1),
    ];
  }
  catalog.records = records;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.setDefaultTimeout(15000);
  const newRecords = [];

  await login(page);

  await page.goto(`${BASE_URL}client_list_parole_and_pardone_create`, { waitUntil: 'load' });
  await waitForReady(page);
  newRecords.push(
    await capture(
      page,
      'Fact Sheet Parole and Pardone',
      '081-fact-sheet-parole-and-pardone-create-client-create-client.png',
      'create client',
      'Fact Sheet Parole and Pardone Create Client'
    )
  );

  const catalog = JSON.parse(await fs.readFile(CATALOG_FILE, 'utf-8'));
  mergeCatalog(catalog, newRecords);
  await fs.writeFile(CATALOG_FILE, JSON.stringify(catalog, null, 2), 'utf-8');
  console.log(JSON.stringify({ captured: newRecords.length, files: newRecords.map((r) => r.filename) }, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
