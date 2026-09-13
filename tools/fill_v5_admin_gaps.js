/**
 * Fill remaining screenshots missing from the admin folder capture.
 */
const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots_20260911');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tidy(page) {
  await page.evaluate(() => {
    document.body.classList.add('loaded');
    document.querySelectorAll('.overlay').forEach((el) => el.style.setProperty('display', 'none', 'important'));
    document.querySelectorAll('.fs-panel-loader').forEach((el) => el.classList.add('is-hidden'));
    document.querySelectorAll('#fsDynamicToast, .fs-dynamic-toast').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
  }).catch(() => {});
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 25000 });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\/(investigation_docketing|dashboard|client_list)/, { timeout: 35000 }).catch(() => {});
  await page.waitForFunction(() => /field_office_id=/.test(document.cookie) && !!localStorage.getItem('permission'), null, { timeout: 20000 }).catch(() => {});
  await sleep(1200);
  await tidy(page);
}

async function capture(page, records, folder, name, kind, captions, fullPage = false) {
  await tidy(page);
  await sleep(400);
  const dir = path.join(SCREENSHOT_DIR, folder);
  await fs.mkdir(dir, { recursive: true });
  const filename = `${String(records.length + 1).padStart(3, '0')}-${name}-${kind}.png`.replace(/\s+/g, '-').toLowerCase();
  const relative = `${folder}/${filename}`;
  const dest = path.join(dir, filename);
  const modal = page.locator('.modal.show:visible').first();
  if (await modal.count() && await modal.isVisible().catch(() => false)) {
    try {
      const box = await modal.boundingBox();
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
    } catch (_) {
      await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
    }
  } else {
    await page.screenshot({ path: dest, fullPage, animations: 'disabled' });
  }
  const rec = { module: folder, name, kind, filename: relative, folder, url: page.url(), captions };
  records.push(rec);
  console.log('CAPTURED', relative);
  return rec;
}

async function closeModal(page) {
  await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary').first().click({ timeout: 2500 }).catch(() => {});
  await sleep(400);
}

(async () => {
  const catalog = JSON.parse(await fs.readFile(CATALOG_FILE, 'utf8'));
  const records = catalog.records || [];
  const browser = await chromium.launch({ headless: true, channel: 'chrome' }).catch(() => chromium.launch({ headless: true }));
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
  });
  const page = await context.newPage();
  await login(page);

  // User Accounts update / delete
  await page.goto(BASE_URL + 'user_accounts', { waitUntil: 'load', timeout: 25000 });
  await sleep(2500);
  await tidy(page);
  const updateBtn = page.locator('.btn_update, button[title*="Update"], a[title*="Update"], .btn-update').first();
  console.log('user update count', await page.locator('.btn_update').count());
  // dump action buttons
  const actionHtml = await page.evaluate(() => {
    const row = document.querySelector('table tbody tr');
    return row ? row.innerHTML.slice(0, 1500) : 'no row';
  });
  console.log('first row snippet', actionHtml.replace(/\s+/g, ' ').slice(0, 500));

  if (await page.locator('.btn_update').count()) {
    await page.locator('.btn_update').first().click({ force: true });
    await sleep(1800);
    await capture(page, records, '13-user-accounts', 'user-accounts-update', 'update', ['User Accounts (Update)']);
    await page.goto(BASE_URL + 'user_accounts', { waitUntil: 'load' });
    await sleep(2000);
  } else if (await page.locator('table tbody tr .btn, table tbody tr button, table tbody tr a').count()) {
    // try clicking any pencil/edit icon
    const candidates = page.locator('table tbody tr').first().locator('button, a, i.fa-edit, i.fa-pencil, .fa-pen');
    console.log('fallback action elems', await candidates.count());
  }

  if (await page.locator('.btn_remove, .btn_delete').count()) {
    await page.locator('.btn_remove, .btn_delete').first().click({ force: true });
    await sleep(1200);
    await capture(page, records, '13-user-accounts', 'user-accounts-remove-confirmation', 'remove-confirmation', ['User Accounts (Delete)']);
    await closeModal(page);
  }

  // Fact sheet worksheet / PSIR extras
  await page.goto(BASE_URL + 'client_list', { waitUntil: 'load', timeout: 25000 });
  await sleep(2000);
  const link = page.locator('table a[href*="client_view_factsheet"]').first();
  if (await link.count()) {
    await link.click();
    await page.waitForURL(/client_view_factsheet/, { timeout: 20000 }).catch(() => {});
    await sleep(1800);
    await tidy(page);
    const docketTab = page.locator('#docketListTab, a:has-text("Docket List")').first();
    if (await docketTab.count()) {
      await docketTab.click();
      await sleep(2500);
      await tidy(page);
      console.log('pdfWorksheet', await page.locator('.btn_pdfWorksheet').count());
      console.log('editWorksheet', await page.locator('a.fs-edit-worksheet').count());
      console.log('pdfPSIR', await page.locator('.btn_pdfPSIR').count());
      console.log('editPSIR', await page.locator('a.fs-edit-psir').count());
      // dump docket table
      const docketText = await page.evaluate(() => {
        const t = document.querySelector('#docketList, #docketListTabContent, .tab-pane.active');
        return (t && t.innerText || document.body.innerText).slice(0, 800);
      });
      console.log('docket text', docketText.replace(/\s+/g, ' ').slice(0, 600));

      const printWs = page.locator('.btn_pdfWorksheet').first();
      if (await printWs.count()) {
        await printWs.click().catch(() => {});
        await sleep(2500);
        await capture(page, records, '10-fact-sheet-probation', 'fact-sheet-probation-worksheet-print-out-sample', 'worksheet-print', ['Fact Sheet Probation — Worksheet Print Out Sample']);
        await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
        await sleep(400);
      }

      const printPsir = page.locator('.btn_pdfPSIR').first();
      if (await printPsir.count()) {
        await printPsir.click().catch(() => {});
        await sleep(2500);
        await capture(page, records, '10-fact-sheet-probation', 'fact-sheet-probation-psir-print-out-sample', 'psir-print', ['Fact Sheet Probation — PSIR Print Out Sample']);
        await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
        await sleep(400);
      }

      const editWs = page.locator('a.fs-edit-worksheet, .fs-edit-worksheet, a:has-text("Edit")').first();
      // Prefer worksheet edit specifically
      let ws = page.locator('a.fs-edit-worksheet').first();
      if (!(await ws.count())) {
        // try buttons in worksheet column
        ws = page.locator('table a, table button').filter({ hasText: /edit/i }).first();
      }
      if (await page.locator('a.fs-edit-worksheet').count()) {
        const href = await page.locator('a.fs-edit-worksheet').first().getAttribute('href');
        if (href) {
          await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 25000 });
          await sleep(1500);
          await capture(page, records, '10-fact-sheet-probation', 'fact-sheet-probation-fill-out-worksheet', 'worksheet-editor', ['Fact Sheet Probation — Fill Out Worksheet'], false);
          const saveBtn = page.locator('.btn-saveData:visible').first();
          if (await saveBtn.count()) {
            await saveBtn.click().catch(() => {});
            await sleep(800);
            await capture(page, records, '10-fact-sheet-probation', 'fact-sheet-probation-worksheet-save-changes', 'worksheet-save-dialog', ['Confirmation dialog — Save Changes or Update Changes']);
            await closeModal(page);
          }
          await page.goBack().catch(() => {});
          await sleep(1500);
          const docketTab2 = page.locator('#docketListTab, a:has-text("Docket List")').first();
          if (await docketTab2.count()) {
            await docketTab2.click();
            await sleep(1800);
          }
        }
      }

      if (await page.locator('a.fs-edit-psir').count()) {
        const href = await page.locator('a.fs-edit-psir').first().getAttribute('href');
        if (href) {
          await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 25000 });
          await sleep(1500);
          await capture(page, records, '10-fact-sheet-probation', 'fact-sheet-probation-fill-out-psir', 'psir-editor', ['Fact Sheet Probation — Fill Out PSIR'], false);
          const saveBtn = page.locator('.btn-saveData:visible').first();
          if (await saveBtn.count()) {
            await saveBtn.click().catch(() => {});
            await sleep(800);
            await capture(page, records, '10-fact-sheet-probation', 'fact-sheet-probation-psir-save-changes', 'psir-save-dialog', ['Confirmation dialog — Save Changes or Update Changes']);
            await closeModal(page);
          }
        }
      }
    }
  }

  catalog.records = records;
  catalog.filledAt = new Date().toISOString();
  await fs.writeFile(CATALOG_FILE, JSON.stringify(catalog, null, 2));
  await browser.close();
  console.log(JSON.stringify({ total: records.length }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
