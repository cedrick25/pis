const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260910');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
    args: ['--disable-features=PasswordManagerOnboarding,PasswordCheck,AutofillServerCommunication'],
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  });
  const page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 25000 });
  await sleep(800);
  await page.evaluate(() => {
    document.querySelectorAll('input.email, input.password').forEach((el) => {
      el.value = '';
      el.blur();
    });
  });
  await page.locator('input.email').fill('');
  await page.locator('input.password').fill('');
  await sleep(200);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '001-login-page.png'),
    fullPage: false,
    animations: 'disabled',
  });
  console.log('recaptured login');

  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await page.waitForFunction(() => /field_office_id=/.test(document.cookie), null, { timeout: 20000 }).catch(() => {});
  await sleep(1500);

  await page.goto(BASE_URL + 'user_accounts', { waitUntil: 'load', timeout: 25000 });
  await sleep(2000);
  await page.evaluate(() => {
    document.querySelectorAll('.overlay').forEach((el) => el.style.setProperty('display', 'none', 'important'));
  });

  await page.evaluate(() => {
    if (window.jQuery) {
      window.jQuery('#updateUserModal').modal('show');
    }
  });
  await sleep(800);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '098-user-accounts-update-update.png'),
    fullPage: false,
    animations: 'disabled',
  });
  console.log('captured update modal');

  await page.evaluate(() => {
    if (window.jQuery) {
      window.jQuery('#updateUserModal').modal('hide');
    }
  });
  await sleep(500);
  await page.evaluate(() => {
    if (window.jQuery) {
      window.jQuery('#removeModal').modal('show');
    }
  });
  await sleep(800);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '099-user-accounts-remove-confirmation-remove-confirmation.png'),
    fullPage: false,
    animations: 'disabled',
  });
  console.log('captured remove modal');

  await browser.close();

  const catalog = JSON.parse(await fs.readFile(CATALOG_FILE, 'utf8'));
  const extra = [
    {
      module: 'User Accounts',
      name: 'User Accounts',
      kind: 'update',
      filename: '098-user-accounts-update-update.png',
      url: BASE_URL + 'user_accounts',
    },
    {
      module: 'User Accounts',
      name: 'User Accounts',
      kind: 'remove confirmation',
      filename: '099-user-accounts-remove-confirmation-remove-confirmation.png',
      url: BASE_URL + 'user_accounts',
    },
  ];
  const existing = new Set((catalog.records || []).map((r) => r.filename));
  extra.forEach((rec) => {
    if (!existing.has(rec.filename)) catalog.records.push(rec);
  });
  await fs.writeFile(CATALOG_FILE, JSON.stringify(catalog, null, 2));
  console.log('catalog updated');
})();
