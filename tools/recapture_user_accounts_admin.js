const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260910');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await page.waitForFunction(() => /field_office_id=/.test(document.cookie), null, { timeout: 20000 }).catch(() => {});
  await sleep(1500);
  await page.goto(BASE_URL + 'user_accounts', { waitUntil: 'load', timeout: 25000 });
  await sleep(2000);
  const n = await page.locator('.btn_update').count();
  console.log('update buttons', n);
  if (n) {
    await page.locator('.btn_update').first().click({ force: true });
    await sleep(1800);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '098-user-accounts-update-update.png'), fullPage: false });
    console.log('captured update');
    await page.goto(BASE_URL + 'user_accounts', { waitUntil: 'load' });
    await sleep(1500);
  }
  if (await page.locator('.btn_remove, .btn_delete').count()) {
    await page.locator('.btn_remove, .btn_delete').first().click({ force: true });
    await sleep(1200);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '099-user-accounts-remove-confirmation-remove-confirmation.png'), fullPage: false });
    console.log('captured delete');
  }
  await browser.close();
})();
