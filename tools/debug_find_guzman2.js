const { chromium } = require('playwright');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await (
    await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 })
  ).newPage();
  await page.goto('http://localhost/pis/', { waitUntil: 'load' });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\//, { timeout: 35000 }).catch(() => {});
  await sleep(2000);
  await page.goto('http://localhost/pis/investigation_docketing', { waitUntil: 'load' });
  await sleep(2500);

  const inputs = await page.locator('input:visible').evaluateAll((els) =>
    els.map((e) => ({ ph: e.placeholder, name: e.name, id: e.id, cls: e.className.slice(0, 60) }))
  );
  console.log(JSON.stringify(inputs, null, 2));

  for (const term of ['PI-2025-09-00128', 'guzman', 'aurestila', 'virgilio', 'virgelio']) {
    await page.evaluate(() => {
      document.querySelectorAll('input:visible, input.form-control').forEach((el) => {
        if (el.type === 'text' || el.type === 'search' || !el.type) el.value = '';
      });
    });
    const filled = await page.evaluate((term) => {
      const all = Array.from(document.querySelectorAll('input'));
      const visible = all.filter((el) => el.offsetParent !== null);
      let target = null;
      if (/^PI-/i.test(term)) {
        target = visible.find((el) => /docket/i.test(el.placeholder + el.name + el.id));
      } else {
        target = visible.find((el) => /name/i.test(el.placeholder + el.name + el.id));
      }
      if (!target && visible[0]) target = visible.find((el) => el.type === 'text' || el.type === 'search') || visible[0];
      if (!target) return null;
      target.value = term;
      target.dispatchEvent(new Event('input', { bubbles: true }));
      return target.placeholder || target.name || target.id;
    }, term);

    const run = page.locator('button:has-text("Run search")').first();
    if (await run.count()) {
      await run.click();
      await sleep(2500);
    }
    const body = (await page.locator('table tbody').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 400);
    console.log('term', term, 'filled', filled, '=>', body);
    if (/guzman|aurestila|00128/i.test(body)) {
      const href = await page.locator('table tbody tr').first().locator('.btn_factsheet, a[href*="client_view_factsheet"]').first().getAttribute('href').catch(() => null);
      const docket = await page.locator('table tbody tr').first().locator('.btn_factsheet').first().getAttribute('data-docket').catch(() => null);
      console.log('FOUND', { href, docket });
      break;
    }
  }

  // Also try direct client_id scan from earlier known PI-2025-09-00128 if present in unfiltered list via pagination length
  await page.evaluate(() => {
    const sel = document.querySelector('select[name="table_head_length"], .dataTables_length select');
    if (sel) {
      sel.value = '100';
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await sleep(2000);
  const hit = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table tbody tr'));
    for (const row of rows) {
      const t = row.innerText || '';
      if (/guzman|aurestila|00128/i.test(t)) {
        const btn = row.querySelector('.btn_factsheet');
        return { text: t.replace(/\s+/g, ' ').slice(0, 200), docket: btn && btn.getAttribute('data-docket'), html: btn && btn.outerHTML };
      }
    }
    return null;
  });
  console.log('scan100', hit);

  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
