const { chromium } = require('playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const BASE = 'http://localhost/pis/';

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await (await browser.newContext({ viewport: { width: 1600, height: 1000 } })).newPage();
  await page.goto(BASE, { waitUntil: 'load' });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await sleep(2000);

  await page.goto(BASE + 'client_list', { waitUntil: 'load' });
  await sleep(3000);

  // Try DataTables search
  const search = page.locator('.dataTables_filter input, input[type="search"]').first();
  console.log('search count', await search.count());
  if (await search.count()) {
    await search.fill('guzman');
    await sleep(2000);
  }
  let text = await page.locator('table tbody').innerText().catch(() => '');
  console.log('after guzman search:', text.replace(/\s+/g, ' ').slice(0, 500));
  console.log('links', await page.$$eval('table a[href*="client_view_factsheet"]', (els) =>
    els.slice(0, 20).map((e) => [e.textContent.trim(), e.getAttribute('href')])
  ));

  // Also try investigation list
  await page.goto(BASE + 'investigation_docketing', { waitUntil: 'load' });
  await sleep(2500);
  const dSearch = page.locator('.dataTables_filter input, input[type="search"]').first();
  if (await dSearch.count()) {
    await dSearch.fill('guzman');
    await sleep(2000);
  }
  // custom search fields?
  for (const sel of ['input[name*="name"]', '#name', 'input.client_name', 'input[placeholder*="Name"]']) {
    const el = page.locator(sel).first();
    if (await el.count() && await el.isVisible().catch(() => false)) {
      await el.fill('guzman');
      console.log('filled', sel);
    }
  }
  const run = page.locator('button:has-text("Run search"), .btn-search, button:has-text("Search")').first();
  if (await run.count()) {
    await run.click().catch(() => {});
    await sleep(2500);
  }
  text = await page.locator('table tbody').innerText().catch(() => '');
  console.log('investigation search:', text.replace(/\s+/g, ' ').slice(0, 600));
  console.log('factsheet buttons', await page.locator('.btn_factsheet').count());

  // dump first row actions html
  console.log('row0', await page.locator('table tbody tr').first().innerHTML().catch(() => 'none').then((s) => String(s).replace(/\s+/g, ' ').slice(0, 400)));

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
