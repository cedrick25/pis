const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = 'jssantos';
const PASSWORD = 'Dojppa2022';
const ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots_20260907');
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

async function waitForReady(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
  await sleep(500);
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await sleep(800);
}

async function waitForTableOrButtons(page) {
  await page.locator('table tbody tr, .btn_view, .btn_update, a[href*="client_view_factsheet"]').first()
    .waitFor({ timeout: 20000 })
    .catch(() => {});
  await sleep(800);
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 20000 });
  await waitForReady(page);
  await page.evaluate(() => localStorage.setItem('api', 'http://localhost/'));
  await page.locator('input.email').fill(USERNAME);
  await page.locator('input.password').fill(PASSWORD);
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 25000 }).catch(() => {});
  await waitForReady(page);
}

async function setRoleId(page, roleId) {
  await page.context().addCookies([{
    name: 'role_id',
    value: String(roleId),
    domain: 'localhost',
    path: '/',
  }]);
  await page.evaluate((id) => {
    document.cookie = 'role_id=' + id + '; path=/';
  }, String(roleId));
}

async function capture(page, records, name, kind, moduleName) {
  await waitForReady(page);
  const safeName = `${String(records.length + 1).padStart(3, '0')}-${slugify(name)}-${slugify(kind)}`;
  const filename = `${safeName}.png`;
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename), fullPage: true });
  const record = { module: moduleName || name, name, kind, filename, url: page.url() };
  records.push(record);
  console.log(`CAPTURED ${filename}`);
  return record;
}

async function clickAndCaptureAction(page, records, moduleName, selector, actionName) {
  const loc = page.locator(selector).first();
  if (!(await loc.count().catch(() => 0))) {
    console.log(`NO ${actionName} on ${moduleName}`);
    return false;
  }
  const before = page.url();
  await loc.click({ timeout: 5000, force: true }).catch(() => {});
  await sleep(1800);
  await capture(page, records, `${moduleName} ${actionName}`, actionName, moduleName);
  const hasModal = await page.locator('.modal.show').count().catch(() => 0);
  if (hasModal) {
    await page.keyboard.press('Escape').catch(() => {});
    await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close').first().click({ timeout: 2000 }).catch(() => {});
    await sleep(400);
  } else if (page.url() !== before) {
    await page.goto(before, { waitUntil: 'load', timeout: 20000 }).catch(() => {});
    await waitForReady(page);
    await waitForTableOrButtons(page);
  }
  return true;
}

const modules = [
  ['Probation Investigation', 'investigation_docketing'],
  ['Probation Courtesy Investigation', 'probation-courtesy-investigation-list'],
  ['Probation Supervision', 'supervision_docketing'],
  ['Probation Courtesy Supervision', 'probation-courtesy-supervision-list'],
  ['Parole and Pardon Investigation', 'parole-pardon-investigation-list'],
  ['Parole and Pardon Courtesy Investigation', 'parole-pardon-courtesy-investigation-list'],
  ['Parole and Pardon Supervision', 'parole-pardon-supervision'],
  ['Parole and Pardon Courtesy Supervision', 'parole-pardon-courtesy-supervision-list'],
  ['Fact Sheet Parole and Pardone', 'client_list_parole_and_pardone'],
  ['User Accounts', 'user_accounts'],
  ['User Roles', 'user_roles'],
  ['Field Office', 'department'],
  ['Region', 'location'],
  ['Permission', 'permission'],
];

async function openFirstClientProfile(page) {
  await page.goto(`${BASE_URL}client_list`, { waitUntil: 'load', timeout: 25000 });
  await waitForReady(page);
  await waitForTableOrButtons(page);
  const link = page.locator('a[href*="client_view_factsheet"]').first();
  if (!(await link.count().catch(() => 0))) {
    const names = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('table a')).slice(0, 8).map((a) => a.href);
    });
    console.log('client list links', names);
    return false;
  }
  await link.click();
  await page.waitForURL(/client_view_factsheet/, { timeout: 20000 }).catch(() => {});
  await waitForReady(page);
  await sleep(1500);
  return /client_view_factsheet/.test(page.url());
}

async function captureFactSheetAndRoles(page, records) {
  const opened = await openFirstClientProfile(page);
  if (!opened) {
    console.log('SKIP fact sheet extras: no client profile link');
    return;
  }
  await capture(page, records, 'Fact Sheet Probation client view profile', 'client view profile', 'Fact Sheet Probation');
  await capture(page, records, 'Fact Sheet Probation click client name', 'click client name', 'Fact Sheet Probation');
  await capture(page, records, 'Fact Sheet Probation client profile tabs', 'tabs', 'Fact Sheet Probation');

  if (await page.locator('.btn-photo, [data-target="#uploadPicModal"]').count()) {
    await page.locator('.btn-photo, [data-target="#uploadPicModal"]').first().click({ force: true }).catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation upload photo', 'upload photo', 'Fact Sheet Probation');
    await page.keyboard.press('Escape').catch(() => {});
    await sleep(300);
  }
  if (await page.locator('.btn-take, [data-target="#cameraModal"]').count()) {
    await page.locator('.btn-take, [data-target="#cameraModal"]').first().click({ force: true }).catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation take photo', 'take photo', 'Fact Sheet Probation');
    await page.keyboard.press('Escape').catch(() => {});
    await sleep(300);
  }
  if (await page.locator('.btn-fingerprint').count()) {
    await page.locator('.btn-fingerprint').first().click({ force: true }).catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation upload fingerprint', 'upload fingerprint', 'Fact Sheet Probation');
    await page.keyboard.press('Escape').catch(() => {});
    await sleep(300);
  }

  const docketTab = page.locator('a:has-text("Docket List"), a[href="#docket"]').first();
  if (await docketTab.count()) {
    await docketTab.click({ force: true }).catch(() => {});
    await sleep(1800);
    await capture(page, records, 'Fact Sheet Probation Worksheet and PSIR Overview', 'docket list', 'Fact Sheet Probation');
    await capture(page, records, 'Fact Sheet Probation Navigate to Worksheet', 'docket worksheet', 'Fact Sheet Probation');
    await capture(page, records, 'Fact Sheet Probation Navigate to PSIR', 'docket psir', 'Fact Sheet Probation');

    const editWs = page.locator('a.fs-edit-worksheet, a[href*="worksheet_identifying_data"]').first();
    if (await editWs.count()) {
      const href = await editWs.getAttribute('href');
      if (href) {
        await page.goto(new URL(href, page.url()).toString(), { waitUntil: 'load', timeout: 25000 }).catch(() => {});
        await waitForReady(page);
        await capture(page, records, 'Fact Sheet Probation Fill Out Worksheet', 'worksheet editor', 'Fact Sheet Probation');
        await page.goBack().catch(() => {});
        await waitForReady(page);
        await docketTab.click({ force: true }).catch(() => {});
        await sleep(1000);
      }
    }
    const editPsir = page.locator('a.fs-edit-psir, a[href*="psir_identifying_data"]').first();
    if (await editPsir.count()) {
      const href = await editPsir.getAttribute('href');
      if (href) {
        await page.goto(new URL(href, page.url()).toString(), { waitUntil: 'load', timeout: 25000 }).catch(() => {});
        await waitForReady(page);
        await capture(page, records, 'Fact Sheet Probation Fill Out PSIR', 'psir editor', 'Fact Sheet Probation');
      }
    }
  }

  const variants = [
    { roleId: '32', caption: 'CPPO fact sheet full access' },
    { roleId: '4', caption: 'Field Officer fact sheet owner scoped' },
    { roleId: '99', caption: 'Clerk other fact sheet restricted' },
  ];
  for (const variant of variants) {
    await setRoleId(page, variant.roleId);
    const ok = await openFirstClientProfile(page);
    if (!ok) {
      console.log('SKIP role', variant.caption);
      continue;
    }
    await capture(page, records, `${variant.caption} client profile`, 'client profile', variant.caption);
    const tab = page.locator('a:has-text("Docket List"), a[href="#docket"]').first();
    if (await tab.count()) {
      await tab.click({ force: true }).catch(() => {});
      await sleep(1800);
      await capture(page, records, `${variant.caption} docket list`, 'docket list', variant.caption);
    }
  }
}

async function main() {
  const existing = JSON.parse(await fs.readFile(CATALOG_FILE, 'utf8').catch(() => '{"records":[],"errors":[]}'));
  const records = existing.records || [];
  const errors = existing.errors || [];
  const startCount = records.length;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(12000);

  try {
    await login(page);
    for (const [moduleName, route] of modules) {
      try {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'load', timeout: 25000 });
        await waitForReady(page);
        await waitForTableOrButtons(page);
        await clickAndCaptureAction(page, records, moduleName, '.btn_view, button:has-text("View")', 'View');
        await clickAndCaptureAction(page, records, moduleName, '.btn_update, button:has-text("Update")', 'Update');
        await clickAndCaptureAction(page, records, moduleName, '.btn_attachments, .btn_upload, button:has-text("Attachments")', 'Attachments');
        await clickAndCaptureAction(page, records, moduleName, '.btn_remove, .btn_delete, button:has-text("Remove")', 'Remove confirmation');
      } catch (err) {
        errors.push({ module: moduleName, message: String(err && err.message ? err.message : err) });
        console.log('ERROR', moduleName, errors[errors.length - 1].message);
      }
    }
    await captureFactSheetAndRoles(page, records);
  } finally {
    await browser.close();
  }

  existing.records = records;
  existing.errors = errors;
  existing.generatedAt = new Date().toISOString();
  await fs.writeFile(CATALOG_FILE, JSON.stringify(existing, null, 2));
  console.log(JSON.stringify({ added: records.length - startCount, total: records.length, errors: errors.length }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
