const { chromium } = require('playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await (
    await browser.newContext({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 2 })
  ).newPage();

  await page.goto('http://localhost/pis/');
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await sleep(2500);
  console.log('after login', page.url());

  await page.goto('http://localhost/pis/investigation_docketing', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await sleep(5000);
  console.log('inv url', page.url());
  console.log('title', await page.title());
  console.log('has table', await page.locator('table').count());
  console.log('has search', await page.locator('.docketSearchInput, #pis_inv_docket_search').count());
  console.log('has factsheet', await page.locator('.btn_factsheet').count());
  console.log('body', (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 700));
  await page.screenshot({
    path: 'C:/wamp64/www/pis/PIS_End_User_Manual_Screenshots_20260911/10-fact-sheet-probation/debug-inv.png',
    fullPage: false,
  });

  // Try client list approach: browse pages for guzman by changing length / paging
  await page.goto('http://localhost/pis/client_list', { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  await sleep(4000);
  console.log('client list url', page.url());
  console.log('client links', await page.locator('a[href*="client_view_factsheet"]').count());

  // Direct open a known-good URL pattern from earlier successful worksheet capture
  await page.goto('http://localhost/pis/client_view_factsheet?client_id=231&field_office_id=45', { waitUntil: 'load' });
  await sleep(6000);
  console.log('direct url', page.url());
  console.log('Take Photo', await page.locator('text=Take Photo').count());
  console.log('Docket List', await page.locator('text=Docket List').count());
  console.log('nav', await page.locator('.nav-tabs .nav-link').allTextContents().catch(() => []));
  console.log('fact body', (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 900));
  await page.screenshot({
    path: 'C:/wamp64/www/pis/PIS_End_User_Manual_Screenshots_20260911/10-fact-sheet-probation/debug-direct.png',
    fullPage: true,
  });

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
