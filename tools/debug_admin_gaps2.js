const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost/pis/';
const OUT = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260911');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await (await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2,
  })).newPage();

  await page.goto(BASE_URL, { waitUntil: 'load' });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await page.waitForFunction(() => /field_office_id=/.test(document.cookie), null, { timeout: 20000 }).catch(() => {});
  await sleep(2000);
  console.log('cookie', await page.evaluate(() => document.cookie));
  console.log('perm', await page.evaluate(() => (localStorage.getItem('permission') || '').slice(0, 300)));

  await page.goto(BASE_URL + 'user_accounts', { waitUntil: 'load' });
  await sleep(5000);
  console.log('UA rows', await page.locator('table tbody tr').count());
  console.log('UA text', (await page.locator('table').innerText().catch(() => '')).slice(0, 400));
  console.log('UA update', await page.locator('.btn_update').count());
  await page.screenshot({ path: path.join(OUT, '13-user-accounts', 'debug-user-accounts.png'), fullPage: false });

  // Try jssantos account for user accounts if admin has empty table? Keep admin for now.
  // Find client with dockets via investigation list fact sheet button first
  await page.goto(BASE_URL + 'investigation_docketing', { waitUntil: 'load' });
  await sleep(2500);
  const fsBtn = page.locator('.btn_factsheet').first();
  if (await fsBtn.count()) {
    await fsBtn.click({ force: true });
    await page.waitForURL(/client_view_factsheet/, { timeout: 20000 }).catch(() => {});
    await sleep(2000);
    const tab = page.locator('#docketListTab, a:has-text("Docket List")').first();
    if (await tab.count()) {
      await tab.click();
      await sleep(3000);
    }
    console.log('from docket FS url', page.url());
    console.log('editWorksheet', await page.locator('a.fs-edit-worksheet').count());
    console.log('pdfWorksheet', await page.locator('.btn_pdfWorksheet').count());
    console.log('editPSIR', await page.locator('a.fs-edit-psir').count());
    console.log('pdfPSIR', await page.locator('.btn_pdfPSIR').count());
    const text = await page.evaluate(() => (document.body.innerText || '').replace(/\s+/g, ' ').slice(0, 700));
    console.log('body', text);
    await page.screenshot({ path: path.join(OUT, '10-fact-sheet-probation', 'debug-docket-list.png'), fullPage: false });
  }

  // Scan first 10 client list links
  await page.goto(BASE_URL + 'client_list', { waitUntil: 'load' });
  await sleep(2500);
  const hrefs = await page.$$eval('table a[href*="client_view_factsheet"]', (els) =>
    els.slice(0, 12).map((e) => e.getAttribute('href'))
  );
  console.log('hrefs', hrefs.length);
  for (const href of hrefs) {
    await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load' });
    await sleep(1200);
    const tab = page.locator('#docketListTab, a:has-text("Docket List")').first();
    if (await tab.count()) {
      await tab.click();
      await sleep(2200);
    }
    const ws = await page.locator('a.fs-edit-worksheet, .btn_pdfWorksheet, a.fs-edit-psir, .btn_pdfPSIR').count();
    console.log(href, 'controls', ws);
    if (ws > 0) {
      console.log('FOUND', page.url());
      await page.screenshot({ path: path.join(OUT, '10-fact-sheet-probation', 'debug-found-dockets.png'), fullPage: false });
      break;
    }
  }

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
