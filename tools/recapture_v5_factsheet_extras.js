const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = 'jssantos@probation.gov.ph';
const PASSWORD = 'Dojppa2022';
const ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots_20260910');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function slugify(value) {
  return String(value || 'page')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'page';
}

async function tidy(page) {
  await page.evaluate(() => {
    document.body.classList.add('loaded');
    document.querySelectorAll('.overlay').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('.fs-panel-loader').forEach((el) => el.classList.add('is-hidden'));
    document.body.classList.remove('open');
  }).catch(() => {});
}

async function waitForReady(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 20000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await sleep(800);
  await tidy(page);
}

async function capture(page, records, name, kind, moduleName, fullPage) {
  await waitForReady(page);
  const safeName = `${String(records.length + 1).padStart(3, '0')}-${slugify(name)}-${slugify(kind)}`;
  const filename = `${safeName}.png`;
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, filename),
    fullPage: !!fullPage,
    animations: 'disabled',
  });
  records.push({ module: moduleName, name, kind, filename, url: page.url() });
  console.log('CAPTURED', filename);
}

async function closeModal(page) {
  await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close').first().click({ timeout: 2000 }).catch(() => {});
  await sleep(400);
}

(async () => {
  const catalog = JSON.parse(await fs.readFile(CATALOG_FILE, 'utf8'));
  const records = catalog.records || [];
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (e) {
    browser = await chromium.launch({ headless: true });
  }
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  });
  const page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.evaluate(() => {
    const email = document.querySelector('input.email');
    const password = document.querySelector('input.password');
    if (email) email.value = '';
    if (password) password.value = '';
  });
  await capture(page, records, 'Login', 'page', 'Login');

  await page.locator('input.email').fill(USERNAME);
  await page.locator('input.password').fill(PASSWORD);
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await page.waitForFunction(() => /field_office_id=/.test(document.cookie), null, { timeout: 20000 }).catch(() => {});
  await waitForReady(page);

  await page.context().addCookies([{ name: 'role_id', value: '32', url: BASE_URL }]);
  await page.evaluate(() => { document.cookie = 'role_id=32; path=/'; });

  await page.goto(`${BASE_URL}client_list`, { waitUntil: 'load', timeout: 25000 });
  await waitForReady(page);
  await page.locator('table a[href*="client_view_factsheet"]').first().click();
  await page.waitForURL(/client_view_factsheet/, { timeout: 20000 });
  await waitForReady(page);
  await sleep(1500);
  await capture(page, records, 'Fact Sheet Probation client view profile', 'client view profile', 'Fact Sheet Probation', true);
  await capture(page, records, 'Fact Sheet Tabs', 'tabs', 'Fact Sheet Probation', true);

  if (await page.locator('.btn-photo, [data-target="#uploadPicModal"]').count()) {
    await page.locator('.btn-photo, [data-target="#uploadPicModal"]').first().click();
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation upload photo', 'upload photo', 'Fact Sheet Probation');
    await closeModal(page);
  }
  if (await page.locator('.btn-take, [data-target="#cameraModal"]').count()) {
    await page.locator('.btn-take, [data-target="#cameraModal"]').first().click();
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation take photo', 'take photo', 'Fact Sheet Probation');
    await closeModal(page);
  }
  if (await page.locator('.btn-fingerprint').count()) {
    await page.locator('.btn-fingerprint').first().click();
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation upload fingerprint', 'upload fingerprint', 'Fact Sheet Probation');
    await closeModal(page);
  }

  const docketTab = page.locator('#docketListTab');
  await docketTab.click();
  await sleep(2500);
  await capture(page, records, 'Fact Sheet Probation Worksheet and PSIR Overview', 'docket list', 'Fact Sheet Probation', true);
  await capture(page, records, 'Fact Sheet Probation Navigate to Worksheet', 'docket worksheet', 'Fact Sheet Probation', true);
  await capture(page, records, 'Fact Sheet Probation Navigate to PSIR', 'docket psir', 'Fact Sheet Probation', true);

  const printWs = page.locator('.btn_pdfWorksheet').first();
  if (await printWs.count()) {
    await printWs.click();
    await sleep(2800);
    await capture(page, records, 'Fact Sheet Probation Worksheet Print Out Sample', 'worksheet print', 'Fact Sheet Probation');
    await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
    await sleep(400);
  }
  const printPsir = page.locator('.btn_pdfPSIR').first();
  if (await printPsir.count()) {
    await printPsir.click();
    await sleep(2800);
    await capture(page, records, 'Fact Sheet Probation PSIR Print Out Sample', 'psir print', 'Fact Sheet Probation');
    await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
    await sleep(400);
  }

  const editWs = page.locator('a.fs-edit-worksheet').first();
  if (await editWs.count()) {
    const href = await editWs.getAttribute('href');
    await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 25000 });
    await waitForReady(page);
    await capture(page, records, 'Fact Sheet Probation Fill Out Worksheet', 'worksheet editor', 'Fact Sheet Probation', true);
    if (await page.locator('.btn-saveData').count()) {
      await page.locator('.btn-saveData').first().click();
      await sleep(800);
      await capture(page, records, 'Fact Sheet Probation Worksheet Save Changes', 'worksheet save dialog', 'Fact Sheet Probation');
      await closeModal(page);
    }
    await page.goBack();
    await waitForReady(page);
    await page.locator('#docketListTab').click().catch(() => {});
    await sleep(2000);
  }

  const editPsir = page.locator('a.fs-edit-psir').first();
  if (await editPsir.count()) {
    const href = await editPsir.getAttribute('href');
    await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 25000 });
    await waitForReady(page);
    await capture(page, records, 'Fact Sheet Probation Fill Out PSIR', 'psir editor', 'Fact Sheet Probation', true);
    if (await page.locator('.btn-saveData').count()) {
      await page.locator('.btn-saveData').first().click();
      await sleep(800);
      await capture(page, records, 'Fact Sheet Probation PSIR Save Changes', 'psir save dialog', 'Fact Sheet Probation');
      await closeModal(page);
    }
  }

  await page.goto(`${BASE_URL}client_list_parole_and_pardone`, { waitUntil: 'load', timeout: 25000 });
  await waitForReady(page);
  await page.locator('table a[href*="client_view_factsheet_parole_pardone"]').first().click();
  await page.waitForURL(/client_view_factsheet_parole/, { timeout: 20000 });
  await waitForReady(page);
  await sleep(1500);
  await capture(page, records, 'Fact Sheet Parole and Pardon client view profile', 'client view profile', 'Fact Sheet Parole and Pardone', true);
  await capture(page, records, 'Fact Sheet Parole and Pardon client profile tabs', 'tabs', 'Fact Sheet Parole and Pardone', true);
  if (await page.locator('.btn-photo, [data-target="#uploadPicModal"]').count()) {
    await page.locator('.btn-photo, [data-target="#uploadPicModal"]').first().click();
    await sleep(800);
    await capture(page, records, 'Fact Sheet Parole and Pardon upload photo', 'upload photo', 'Fact Sheet Parole and Pardone');
    await closeModal(page);
  }
  if (await page.locator('.btn-take, [data-target="#cameraModal"]').count()) {
    await page.locator('.btn-take, [data-target="#cameraModal"]').first().click();
    await sleep(800);
    await capture(page, records, 'Fact Sheet Parole and Pardon take photo', 'take photo', 'Fact Sheet Parole and Pardone');
    await closeModal(page);
  }

  await browser.close();
  catalog.records = records;
  catalog.generatedAt = new Date().toISOString();
  await fs.writeFile(CATALOG_FILE, JSON.stringify(catalog, null, 2));
  console.log(JSON.stringify({ screenshots: records.length, catalog: CATALOG_FILE }));
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
