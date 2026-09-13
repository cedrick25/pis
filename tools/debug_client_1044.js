const { chromium } = require('playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await (await browser.newContext({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 })).newPage();
  await page.goto('http://localhost/pis/');
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\/(investigation_docketing|dashboard|client_list)/, { timeout: 45000 });
  await page.waitForFunction(() => /field_office_id=/.test(document.cookie), null, { timeout: 20000 });
  await sleep(1500);

  await page.goto('http://localhost/pis/client_view_factsheet?client_id=1044&field_office_id=46', { waitUntil: 'load' });
  await sleep(8000);
  console.log('url', page.url());
  console.log('text Take Photo', await page.locator('text=Take Photo').count());
  console.log('text Docket List', await page.locator('text=Docket List').count());
  console.log('text Fact Sheet', await page.locator('text=Fact Sheet').count());
  console.log('nav-tabs', await page.locator('.nav-tabs').count(), await page.locator('.nav-tabs .nav-link').allTextContents().catch(() => []));
  console.log('all tabs role', await page.locator('[role=tab]').allTextContents().catch(() => []));
  // dump ids containing tab
  const ids = await page.evaluate(() => Array.from(document.querySelectorAll('[id*="tab" i], [id*="Tab"], .nav-link')).map((e) => ({ id: e.id, cls: e.className, text: (e.innerText || '').trim().slice(0, 40) })).slice(0, 40));
  console.log(ids);
  console.log('body', (await page.locator('body').innerText()).replace(/\s+/g, ' ').slice(0, 1200));
  await page.screenshot({ path: 'C:/wamp64/www/pis/PIS_End_User_Manual_Screenshots_20260911/10-fact-sheet-probation/debug-1044.png', fullPage: true });
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
