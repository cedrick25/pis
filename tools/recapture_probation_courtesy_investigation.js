/**
 * Recapture Probation Courtesy Investigation View/Update with correct officeId.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const OUT_DIR = path.resolve(
  __dirname,
  '..',
  'PIS_End_User_Manual_Screenshots_20260911',
  '03-probation-courtesy-investigation'
);
const CATALOG = path.resolve(
  __dirname,
  '..',
  'PIS_End_User_Manual_Screenshots_20260911',
  'screenshot_catalog.json'
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tidy(page) {
  await page.evaluate(() => {
    document.body.classList.add('loaded');
    document.querySelectorAll('.overlay').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('.fs-panel-loader').forEach((el) => el.classList.add('is-hidden'));
    document.querySelectorAll('#fsDynamicToast, .fs-dynamic-toast').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
  }).catch(() => {});
}

async function expandSections(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.collapse').forEach((el) => {
      el.classList.add('show');
      el.style.display = 'block';
      el.style.height = 'auto';
    });
    document.querySelectorAll('[data-toggle="collapse"]').forEach((el) => {
      el.setAttribute('aria-expanded', 'true');
      el.classList.remove('collapsed');
    });
  }).catch(() => {});
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 25000 });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\/(investigation_docketing|dashboard|client_list)/, { timeout: 35000 }).catch(() => {});
  await page.waitForFunction(() => /field_office_id=/.test(document.cookie), null, { timeout: 20000 }).catch(() => {});
  await sleep(1200);
  await tidy(page);
}

async function waitForList(page) {
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll('table tbody tr');
    if (!rows.length) return false;
    const text = (rows[0].innerText || '').toLowerCase();
    return !text.includes('no data') && !text.includes('loading') && !!rows[0].querySelector('.btn_view');
  }, null, { timeout: 30000 }).catch(() => {});
  await sleep(800);
  await tidy(page);
}

async function findWorkingRow(page) {
  const rows = page.locator('table tbody tr');
  const count = await rows.count();
  for (let i = 0; i < Math.min(count, 15); i++) {
    const row = rows.nth(i);
    const viewBtn = row.locator('.btn_view').first();
    if (!(await viewBtn.count())) continue;
    const docket = await viewBtn.getAttribute('data-docket');
    const oi = await viewBtn.getAttribute('data-oi');
    const updateBtn = row.locator('.btn_update').first();
    const petitionerId = (await updateBtn.getAttribute('data-cid').catch(() => null))
      || (await updateBtn.getAttribute('data-petitioner').catch(() => null))
      || (await updateBtn.getAttribute('data-id').catch(() => null));
    console.log(`row ${i}: docket=${docket} oi=${oi} petitioner=${petitionerId}`);
    if (docket && oi && oi !== 'undefined' && oi !== '') {
      return { index: i, docket, oi, petitionerId, viewBtn, updateBtn };
    }
  }
  return null;
}

async function docketLoaded(page) {
  const err = await page.locator('text=Could not load this docket').count();
  const docketVal = await page.locator('input').evaluateAll((els) => {
    for (const el of els) {
      const v = (el.value || '').trim();
      if (/^CPI-/i.test(v) || /^C?PI-/i.test(v)) return v;
    }
    return '';
  }).catch(() => '');
  return err === 0 && !!docketVal;
}

async function capture(page, filename) {
  await tidy(page);
  await expandSections(page);
  await sleep(400);
  const dest = path.join(OUT_DIR, filename);
  await page.screenshot({ path: dest, fullPage: true, animations: 'disabled' });
  console.log('CAPTURED', dest);
  return dest;
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: 'chrome' }).catch(() => chromium.launch({ headless: true }));
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
  });
  const page = await context.newPage();
  await login(page);

  await page.goto(BASE_URL + 'probation-courtesy-investigation-list', { waitUntil: 'load', timeout: 25000 });
  await waitForList(page);

  // Prefer a row whose View loads successfully
  const rows = page.locator('table tbody tr');
  const count = await rows.count();
  let working = null;

  for (let i = 0; i < Math.min(count, 12); i++) {
    const row = rows.nth(i);
    const viewBtn = row.locator('.btn_view').first();
    if (!(await viewBtn.count())) continue;
    const docket = await viewBtn.getAttribute('data-docket');
    let oi = await viewBtn.getAttribute('data-oi');
    const updateBtn = row.locator('.btn_update').first();
    const petitionerId =
      (await updateBtn.getAttribute('data-cid').catch(() => null)) ||
      (await updateBtn.getAttribute('data-petitionerid').catch(() => null)) ||
      '';

    // Inspect attributes
    const attrs = await updateBtn.evaluate((el) => {
      const out = {};
      for (const a of el.attributes) out[a.name] = a.value;
      return out;
    }).catch(() => ({}));
    console.log(`try row ${i}`, { docket, oi, updateAttrs: attrs });

    if (!oi || oi === 'undefined') {
      // try reading from row data if available
      oi = attrs['data-oi'] || attrs['data-foid'] || '';
    }

    await viewBtn.click({ force: true });
    await sleep(2200);
    await tidy(page);
    const ok = await docketLoaded(page);
    console.log('view loaded?', ok, 'url', page.url());
    if (ok) {
      working = { docket, oi, petitionerId, updateAttrs: attrs };
      await capture(page, '009-probation-courtesy-investigation-view-view.png');
      break;
    }
    await page.goto(BASE_URL + 'probation-courtesy-investigation-list', { waitUntil: 'load', timeout: 25000 });
    await waitForList(page);
  }

  if (!working) {
    throw new Error('No courtesy investigation docket could be loaded for View');
  }

  // Update: go back to list, click matching update with correct oi
  await page.goto(BASE_URL + 'probation-courtesy-investigation-list', { waitUntil: 'load', timeout: 25000 });
  await waitForList(page);

  const updateSelector = `.btn_update[data-docket="${working.docket}"]`;
  let updateBtn = page.locator(updateSelector).first();
  if (!(await updateBtn.count())) {
    updateBtn = page.locator('.btn_update').first();
  }

  // Ensure office id on navigation if button falls back to cookie
  const hrefOi = await updateBtn.getAttribute('data-oi');
  console.log('update data-oi', hrefOi, 'working.oi', working.oi);

  if ((!hrefOi || hrefOi === 'undefined' || hrefOi === '206') && working.oi && working.oi !== '206') {
    // Navigate directly with known good office id when possible
    const pid =
      (await updateBtn.getAttribute('data-cid')) ||
      working.petitionerId ||
      working.updateAttrs['data-cid'] ||
      '';
    const url =
      `${BASE_URL}probation-courtesy-investigation-update?docket_number=${encodeURIComponent(working.docket)}` +
      `&officeId=${encodeURIComponent(working.oi)}` +
      (pid ? `&petitionerId=${encodeURIComponent(pid)}` : '');
    console.log('direct update url', url);
    await page.goto(url, { waitUntil: 'load', timeout: 25000 });
  } else {
    await updateBtn.click({ force: true });
  }
  await sleep(2200);
  await tidy(page);
  const updateOk = await docketLoaded(page);
  console.log('update loaded?', updateOk, 'url', page.url());
  if (!updateOk) {
    // fallback: open view URL pattern with update path using office from successful view URL
    const viewUrl = new URL(page.url());
    // try extract from list row again with evaluate
    await page.goto(BASE_URL + 'probation-courtesy-investigation-list', { waitUntil: 'load' });
    await waitForList(page);
    const meta = await page.evaluate((docket) => {
      const btn = document.querySelector(`.btn_view[data-docket="${docket}"]`);
      const upd = document.querySelector(`.btn_update[data-docket="${docket}"]`);
      return {
        oi: btn && btn.getAttribute('data-oi'),
        cid: upd && (upd.getAttribute('data-cid') || upd.getAttribute('data-petitionerid')),
        html: upd ? upd.outerHTML : null,
      };
    }, working.docket);
    console.log('meta', meta);
    const url =
      `${BASE_URL}probation-courtesy-investigation-update?docket_number=${encodeURIComponent(working.docket)}` +
      `&officeId=${encodeURIComponent(meta.oi || working.oi)}` +
      (meta.cid ? `&petitionerId=${encodeURIComponent(meta.cid)}` : '');
    await page.goto(url, { waitUntil: 'load', timeout: 25000 });
    await sleep(2200);
    await tidy(page);
    console.log('update retry loaded?', await docketLoaded(page), page.url());
  }
  await capture(page, '010-probation-courtesy-investigation-update-update.png');

  // Also refresh attachments + remove if needed (attachments already looked fine; keep consistent docket)
  await page.goto(BASE_URL + 'probation-courtesy-investigation-list', { waitUntil: 'load' });
  await waitForList(page);
  const attachBtn = page.locator(`.btn_attachments[data-docket="${working.docket}"], .btn_upload[data-docket="${working.docket}"]`).first();
  if (await attachBtn.count()) {
    await attachBtn.click({ force: true });
    await sleep(2000);
    await tidy(page);
    await capture(page, '011-probation-courtesy-investigation-attachments-attachments.png');
  }

  await page.goto(BASE_URL + 'probation-courtesy-investigation-list', { waitUntil: 'load' });
  await waitForList(page);
  const removeBtn = page.locator(`.btn_remove[data-docket="${working.docket}"], .btn_delete[data-docket="${working.docket}"]`).first();
  if (await removeBtn.count()) {
    await removeBtn.click({ force: true });
    await sleep(1200);
    await tidy(page);
    const modal = page.locator('.modal.show:visible').first();
    if (await modal.count()) {
      const box = await modal.boundingBox();
      const dest = path.join(OUT_DIR, '012-probation-courtesy-investigation-remove-confirmation-remove-confirmation.png');
      if (box) {
        const pad = 24;
        await page.screenshot({
          path: dest,
          animations: 'disabled',
          clip: {
            x: Math.max(0, box.x - pad),
            y: Math.max(0, box.y - pad),
            width: Math.min(box.width + pad * 2, 1550),
            height: Math.min(box.height + pad * 2, 860),
          },
        });
      } else {
        await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
      }
      console.log('CAPTURED', dest);
    }
  }

  // Refresh list page too for consistency
  await page.goto(BASE_URL + 'probation-courtesy-investigation-list', { waitUntil: 'load' });
  await waitForList(page);
  await page.screenshot({
    path: path.join(OUT_DIR, '008-probation-courtesy-investigation-list-page.png'),
    fullPage: false,
    animations: 'disabled',
  });
  console.log('CAPTURED list');

  // Patch catalog urls/notes
  if (fs.existsSync(CATALOG)) {
    const catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
    for (const rec of catalog.records || []) {
      if (!String(rec.filename || '').includes('03-probation-courtesy-investigation')) continue;
      if (String(rec.kind).toLowerCase().includes('view')) {
        rec.note = 'Recaptured after fixing officeId load failure';
        rec.docket = working.docket;
      }
      if (String(rec.kind).toLowerCase().includes('update')) {
        rec.note = 'Recaptured after fixing officeId load failure';
        rec.docket = working.docket;
      }
    }
    catalog.courtesyInvestigationRecaptureAt = new Date().toISOString();
    fs.writeFileSync(CATALOG, JSON.stringify(catalog, null, 2));
  }

  await browser.close();
  console.log(JSON.stringify({ ok: true, docket: working.docket, oi: working.oi }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
