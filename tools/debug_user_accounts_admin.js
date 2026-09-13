const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('PAGEERR', msg.text());
  });
  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await sleep(2500);
  console.log('after login url', page.url());
  console.log('cookies', await page.evaluate(() => document.cookie));
  console.log('alert', await page.locator('.alert, .swal2-html-container, .login-error, .invalid-feedback').allTextContents().catch(() => []));
  await page.goto(BASE_URL + 'user_accounts', { waitUntil: 'load', timeout: 25000 });
  await sleep(4000);
  console.log('user accounts url', page.url());
  console.log('title', await page.title());
  console.log('heading', await page.locator('h1,h2,h3,.card-header').allTextContents().catch(() => []));
  console.log('table text', (await page.locator('table').innerText().catch(() => '')).slice(0, 800));
  console.log('update count', await page.locator('.btn_update').count());
  console.log('remove count', await page.locator('.btn_remove').count());
  console.log('add visible', await page.locator('.btn_add, .btn-add, button:has-text("Add User")').count());
  const html = await page.locator('table tbody').innerHTML().catch(() => 'none');
  console.log('tbody snippet', html.slice(0, 500));
  await browser.close();
})();
