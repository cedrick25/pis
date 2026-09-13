/**
 * Recapture Fact Sheet Probation screenshots to match live UI framing:
 * viewport (not stretched full-page), natural sidebar, no hidden tabs/menus.
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const OUT_DIR = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260911', '10-fact-sheet-probation');
const CATALOG = path.resolve(__dirname, '..', 'PIS_End_User_Manual_Screenshots_20260911', 'screenshot_catalog.json');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tidy(page) {
  await page.evaluate(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('open');
    document.querySelectorAll('.overlay').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('.fs-panel-loader, .prob-fs-client-list-loader').forEach((el) => {
      el.classList.add('is-hidden');
    });
    document.querySelectorAll('#fsDynamicToast, .fs-dynamic-toast').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    const panel = document.getElementById('left-panel');
    if (panel) panel.classList.remove('open');

    // Keep unused sidebar groups collapsed. Do not un-hide display:none items.
    document.querySelectorAll('#left-panel li.menu-item-has-children.dropdown').forEach((li) => {
      if (getComputedStyle(li).display === 'none') return;
      const toggle = li.querySelector(':scope > .dropdown-toggle');
      const menu = li.querySelector(':scope > .dropdown-menu');
      if (!toggle || !menu) return;
      const keepOpen = li.classList.contains('active') || !!li.querySelector(':scope > .dropdown-menu > li.active');
      if (keepOpen) {
        li.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
        menu.classList.add('show');
      } else {
        li.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
        menu.style.removeProperty('display');
      }
    });
  }).catch(() => {});
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 25000 });
  await page.locator('input.email').fill('admin');
  await page.locator('input.password').fill('admin123');
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\/(investigation_docketing|dashboard|client_list)/, { timeout: 45000 });
  await page.waitForFunction(
    () => /field_office_id=/.test(document.cookie) && !!localStorage.getItem('permission'),
    null,
    { timeout: 30000 }
  );
  await sleep(1800);
  await tidy(page);
}

async function capture(page, filename, captions, records, kind = 'page') {
  await tidy(page);
  await sleep(350);
  const dest = path.join(OUT_DIR, filename);
  await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
  records.push({
    module: 'Fact Sheet Probation',
    name: filename.replace(/\.png$/, ''),
    kind,
    filename: `10-fact-sheet-probation/${filename}`,
    folder: '10-fact-sheet-probation',
    url: page.url(),
    captions,
  });
  console.log('CAPTURED', filename, page.url());
}

async function closeModal(page) {
  const preview = page.locator('#closePreview');
  if (await preview.count()) {
    const visible = await preview.isVisible().catch(() => false);
    if (visible) {
      await preview.click({ timeout: 2000 }).catch(() => {});
      await sleep(400);
    }
  }
  await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary').first()
    .click({ timeout: 2500 }).catch(() => {});
  await page.evaluate(() => {
    const modal = document.getElementById('pdfPreviewModal');
    if (modal) modal.style.display = 'none';
  }).catch(() => {});
  await sleep(500);
}

async function waitForClientList(page) {
  await page.goto(BASE_URL + 'client_list', { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('#tblProbationClientList', { timeout: 25000 });
  await page.waitForFunction(() => {
    const loader = document.getElementById('probFsClientListLoader');
    if (loader && !loader.classList.contains('is-hidden')) return false;
    const rows = document.querySelectorAll('#tblProbationClientList tbody tr');
    return rows.length > 0;
  }, null, { timeout: 35000 }).catch(() => {});
  await sleep(1200);
  await tidy(page);
}

async function searchClientList(page, term) {
  const input = page.locator('#prob_fs_client_search, .prob-fs-client-search-input').first();
  if (!(await input.count())) return false;
  await input.fill(term);
  await page.locator('.client_search, button:has-text("Search")').first().click().catch(async () => {
    await input.press('Enter');
  });
  await sleep(2500);
  await page.waitForFunction(() => {
    const loader = document.getElementById('probFsClientListLoader');
    return !loader || loader.classList.contains('is-hidden');
  }, null, { timeout: 20000 }).catch(() => {});
  await sleep(800);
  return true;
}

async function selectBaybayOffice(page) {
  const sel = page.locator('#pisDocketOfficeFilter');
  if (!(await sel.count())) return false;
  const options = await sel.locator('option').allTextContents();
  const match = options.find((t) => /baybay/i.test(t));
  if (!match) return false;
  const value = await sel.locator('option', { hasText: /baybay/i }).first().getAttribute('value');
  if (value) {
    await sel.selectOption(value).catch(() => {});
    await page.evaluate((v) => {
      const el = document.getElementById('pisDocketOfficeFilter');
      if (!el) return;
      el.value = v;
      el.dispatchEvent(new Event('change', { bubbles: true }));
      if (window.jQuery) window.jQuery(el).trigger('change');
    }, value);
  }
  await sleep(2800);
  return true;
}

async function openAurestila(page) {
  await waitForClientList(page);
  await selectBaybayOffice(page);

  let link = page.locator('#tblProbationClientList tbody a[href*="client_view_factsheet"]').filter({ hasText: /aurestila|virgelio/i }).first();
  if (!(await link.count())) {
    await searchClientList(page, 'aurestila');
    link = page.locator('#tblProbationClientList tbody a[href*="client_view_factsheet"]').filter({ hasText: /aurestila|virgelio/i }).first();
  }
  if (!(await link.count())) {
    await searchClientList(page, 'guzman');
    link = page.locator('#tblProbationClientList tbody a[href*="client_view_factsheet"]').filter({ hasText: /aurestila|virgelio/i }).first();
  }
  if (!(await link.count())) {
    throw new Error('Could not find virgelio guzman y aurestila on client list');
  }
  const href = await link.getAttribute('href');
  console.log('opening', href);
  await link.click();
  await page.waitForURL(/client_view_factsheet/, { timeout: 25000 });
  await page.waitForSelector('#investigationTab, #petitionerName', { timeout: 25000 });
  await page.waitForFunction(() => {
    const name = (document.getElementById('petitionerName') || {}).textContent || '';
    return /aurestila|virgelio/i.test(name);
  }, null, { timeout: 20000 }).catch(() => {});
  await page.waitForFunction(() => {
    const text = document.body.innerText || '';
    return /\.pdf/i.test(text) || /No documents found for this tab/i.test(text);
  }, null, { timeout: 25000 }).catch(() => {});
  await sleep(2000);
  await tidy(page);
  const name = await page.locator('#petitionerName').innerText().catch(() => '');
  const snippet = (await page.locator('.info-details, table').first().innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 220);
  console.log('profile', name, snippet);
  return page.url();
}

async function waitForDocketRows(page) {
  await page.locator('#docketListTab').click();
  await sleep(1200);
  await page.waitForFunction(() => {
    const text = document.body.innerText || '';
    if (/Loading dockets/i.test(text)) return false;
    return /PI-/.test(text) || /No docket records found/i.test(text);
  }, null, { timeout: 30000 }).catch(() => {});
  await page.waitForSelector('a.fs-edit-worksheet, .btn_pdfWorksheet, .table_body_tc tr', { timeout: 20000 }).catch(() => {});
  await sleep(2200);
  await tidy(page);
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const extra of ['debug-1044.png', 'debug-inv.png', 'debug-direct.png']) {
    const p = path.join(OUT_DIR, extra);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }

  const records = [];
  const browser = await chromium.launch({ headless: true, channel: 'chrome' }).catch(() => chromium.launch({ headless: true }));
  const page = await (await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  })).newPage();
  page.setDefaultTimeout(20000);

  await login(page);

  await waitForClientList(page);
  if (await page.locator('.pis-docket-office-filter .select2-container').count()) {
    await page.locator('.pis-docket-office-filter .select2-container').click();
    await page.locator('.select2-search__field').fill('Baybay');
    await sleep(400);
    await page.locator('.select2-results__option').filter({ hasText: /baybay/i }).first().click().catch(() => {});
    await sleep(2800);
  } else {
    await selectBaybayOffice(page);
  }
  await page.waitForFunction(() => {
    const loader = document.getElementById('probFsClientListLoader');
    const text = (document.querySelector('#tblProbationClientList tbody') || {}).innerText || '';
    return (!loader || loader.classList.contains('is-hidden')) && /aurestila|virgelio/i.test(text);
  }, null, { timeout: 25000 }).catch(() => {});
  await tidy(page);
  await capture(page, '043-fact-sheet-probation-list-page.png', ['Fact Sheet Probation list page'], records);

  const factUrl = await openAurestila(page);

  await capture(page, '069-fact-sheet-probation-click-client-name-click-client-name.png', ['Fact Sheet Probation — click client name'], records);
  await capture(page, '070-fact-sheet-probation-client-view-profile-client-view-profile.png', ['Fact Sheet Probation — client view profile'], records);
  await capture(page, '071-fact-sheet-tabs-tabs.png', ['Fact Sheet Tabs'], records);

  if (await page.locator('button:visible:has-text("Upload Photo")').count()) {
    await page.locator('button:visible:has-text("Upload Photo")').first().click();
    await page.waitForSelector('.modal.show:visible', { timeout: 8000 });
    await sleep(700);
    await capture(page, '072-fact-sheet-probation-upload-photo-upload-photo.png', ['Fact Sheet Probation — upload photo'], records, 'modal');
    await closeModal(page);
  }
  if (await page.locator('button:visible:has-text("Take Photo")').count()) {
    await page.locator('button:visible:has-text("Take Photo")').first().click();
    await page.waitForSelector('.modal.show:visible', { timeout: 8000 });
    await sleep(700);
    await capture(page, '073-fact-sheet-probation-take-photo-take-photo.png', ['Fact Sheet Probation — take photo'], records, 'modal');
    await closeModal(page);
  }
  if (await page.locator('button:visible:has-text("Upload Fingerprint")').count()) {
    await page.locator('button:visible:has-text("Upload Fingerprint")').first().click();
    await page.waitForSelector('.modal.show:visible, #uploadFingerprintModal.show', { timeout: 8000 });
    await sleep(1200);
    await capture(page, '074-fact-sheet-probation-upload-fingerprint-upload-fingerprint.png', ['Fact Sheet Probation — upload fingerprint'], records, 'modal');
    await closeModal(page);
  }

  await waitForDocketRows(page);
  const docketCaps = {
    overview: 'Fact Sheet Probation — Worksheet and PSIR Overview',
    worksheet: 'Fact Sheet Probation — Navigate to Worksheet',
    psir: 'Fact Sheet Probation — Navigate to PSIR',
  };
  for (const [file, cap] of [
    ['075-fact-sheet-probation-worksheet-and-psir-overview-docket-list.png', docketCaps.overview],
    ['090-fact-sheet-probation-worksheet-and-psir-overview-docket-list.png', docketCaps.overview],
    ['076-fact-sheet-probation-navigate-to-worksheet-docket-worksheet.png', docketCaps.worksheet],
    ['091-fact-sheet-probation-navigate-to-worksheet-docket-worksheet.png', docketCaps.worksheet],
    ['077-fact-sheet-probation-navigate-to-psir-docket-psir.png', docketCaps.psir],
    ['092-fact-sheet-probation-navigate-to-psir-docket-psir.png', docketCaps.psir],
  ]) await capture(page, file, [cap], records);

  console.log('worksheet controls', {
    pdfWs: await page.locator('.btn_pdfWorksheet').count(),
    editWs: await page.locator('a.fs-edit-worksheet').count(),
    pdfPsir: await page.locator('.btn_pdfPSIR').count(),
    editPsir: await page.locator('a.fs-edit-psir').count(),
    docketText: (await page.locator('.table_body_tc').innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 240),
  });

  if (await page.locator('.btn_pdfWorksheet').count()) {
    await page.locator('.btn_pdfWorksheet').first().click();
    await page.waitForFunction(() => {
      const modal = document.getElementById('pdfPreviewModal');
      return modal && getComputedStyle(modal).display !== 'none';
    }, null, { timeout: 15000 }).catch(() => {});
    await sleep(2200);
    await capture(page, '093-fact-sheet-probation-worksheet-print-out-sample-worksheet-print.png', ['Fact Sheet Probation — Worksheet Print Out Sample'], records, 'modal');
    await closeModal(page);
  }
  if (await page.locator('.btn_pdfPSIR').count()) {
    await page.locator('.btn_pdfPSIR').first().click();
    await page.waitForFunction(() => {
      const modal = document.getElementById('pdfPreviewModal');
      return modal && getComputedStyle(modal).display !== 'none';
    }, null, { timeout: 15000 }).catch(() => {});
    await sleep(2200);
    await capture(page, '094-fact-sheet-probation-psir-print-out-sample-psir-print.png', ['Fact Sheet Probation — PSIR Print Out Sample'], records, 'modal');
    await closeModal(page);
  }

  if (await page.locator('a.fs-edit-worksheet').count()) {
    const href = await page.locator('a.fs-edit-worksheet').first().getAttribute('href');
    if (href) {
      await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 30000 });
      await page.waitForSelector('.btn-saveData, input, .card-title', { timeout: 20000 }).catch(() => {});
      await sleep(1500);
      await tidy(page);
      await capture(page, '095-fact-sheet-probation-fill-out-worksheet-worksheet-editor.png', ['Fact Sheet Probation — Fill Out Worksheet'], records);
      if (await page.locator('.btn-saveData:visible').count()) {
        await page.locator('.btn-saveData:visible').first().click();
        await page.waitForSelector('.modal.show:visible, #saveModal.show', { timeout: 8000 }).catch(() => {});
        await sleep(800);
        await capture(page, '096-fact-sheet-probation-worksheet-save-changes-worksheet-save-dialog.png', ['Confirmation dialog — Save Changes or Update Changes'], records, 'modal');
        await closeModal(page);
      }
    }
  }

  await page.goto(factUrl, { waitUntil: 'load', timeout: 30000 });
  await page.waitForSelector('#docketListTab', { timeout: 20000 });
  await sleep(1800);
  await waitForDocketRows(page);

  if (await page.locator('a.fs-edit-psir').count()) {
    const href = await page.locator('a.fs-edit-psir').first().getAttribute('href');
    if (href) {
      await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 30000 });
      await page.waitForSelector('.btn-saveData, input, .card-title', { timeout: 20000 }).catch(() => {});
      await sleep(1500);
      await tidy(page);
      await capture(page, '097-fact-sheet-probation-fill-out-psir-psir-editor.png', ['Fact Sheet Probation — Fill Out PSIR'], records);
      if (await page.locator('.btn-saveData:visible').count()) {
        await page.locator('.btn-saveData:visible').first().click();
        await page.waitForSelector('.modal.show:visible, #saveModal.show', { timeout: 8000 }).catch(() => {});
        await sleep(800);
        await capture(page, '098-fact-sheet-probation-psir-save-changes-psir-save-dialog.png', ['Confirmation dialog — Save Changes or Update Changes'], records, 'modal');
        await closeModal(page);
      }
    }
  }

  let catalog = { records: [] };
  if (fs.existsSync(CATALOG)) catalog = JSON.parse(fs.readFileSync(CATALOG, 'utf8'));
  const keep = (catalog.records || []).filter((r) => !String(r.filename || '').includes('10-fact-sheet-probation/'));
  catalog.records = keep.concat(records);
  catalog.factSheetProbationRecaptureAt = new Date().toISOString();
  fs.writeFileSync(CATALOG, JSON.stringify(catalog, null, 2));

  await browser.close();
  console.log(JSON.stringify({ captured: records.length, files: records.map((r) => r.filename) }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
