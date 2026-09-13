const { chromium } = require('playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await (await browser.newContext({ viewport: { width: 1600, height: 1100 }, deviceScaleFactor: 2 })).newPage();
  await page.goto('http://localhost/pis/', { waitUntil: 'load' });
  await sleep(1000);
  console.log('login form', await page.locator('input.email').count(), await page.locator('input.password').count());
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  for (let i = 0; i < 20; i++) {
    await sleep(1000);
    const url = page.url();
    const cookie = await page.evaluate(() => document.cookie);
    const fail = await page.locator('text=failed attempt').count();
    const fo = /field_office_id=([^;]+)/.exec(cookie);
    console.log(i, { url, fail, fo: fo && fo[1], hasPerm: !!(await page.evaluate(() => localStorage.getItem('permission'))) });
    if (fo && fo[1] && fo[1] !== 'null' && fo[1] !== '') break;
  }
  await page.screenshot({ path: 'C:/wamp64/www/pis/PIS_End_User_Manual_Screenshots_20260911/10-fact-sheet-probation/debug-login.png', fullPage: false });
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
