const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = process.env.PIS_MANUAL_USER || 'jssantos@probation.gov.ph';
const PASSWORD = process.env.PIS_MANUAL_PASS || 'Dojppa2022';
const ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots_Current');
const CATALOG_FILE = path.join(SCREENSHOT_DIR, 'screenshot_catalog.json');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function slugify(value) {
  return String(value || 'page')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'page';
}

async function tidy(page) {
  await page.evaluate(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('open');
    document.querySelectorAll('.overlay').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('.fs-panel-loader').forEach((el) => el.classList.add('is-hidden'));
    document.querySelectorAll('#fsDynamicToast, .fs-dynamic-toast').forEach((el) => {
      el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll('.dropdown-menu.show').forEach((el) => {
      if (!el.closest('#left-panel')) {
        el.classList.remove('show');
        el.style.display = 'none';
      }
    });
    const panel = document.getElementById('left-panel');
    if (panel) {
      panel.classList.remove('open');
      panel.style.display = '';
    }
  }).catch(() => {});
}

async function waitForReady(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 20000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await sleep(900);
  await tidy(page);
}

async function waitForTableRows(page) {
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll('table tbody tr');
    if (!rows.length) return false;
    const text = (rows[0].innerText || '').toLowerCase();
    if (text.includes('field office could not') || text.includes('loading')) return false;
    return true;
  }, null, { timeout: 20000 }).catch(() => {});
  await page.waitForSelector(
    '.btn_view, .btn_update, .btn_factsheet, a[href*="client_view_factsheet"], table tbody tr td',
    { timeout: 12000 }
  ).catch(() => {});
  await sleep(700);
  await tidy(page);
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 25000 });
  await waitForReady(page);
  await page.locator('input.email').fill(USERNAME);
  await page.locator('input.password').fill(PASSWORD);
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\/(investigation_docketing|dashboard|client_list)/, { timeout: 35000 }).catch(() => {});
  await page.waitForFunction(() => {
    const cookies = document.cookie || '';
    return /field_office_id=/.test(cookies) && !!localStorage.getItem('permission');
  }, null, { timeout: 20000 }).catch(() => {});
  await waitForReady(page);
  await page.waitForFunction(() => document.querySelectorAll('#left-panel a[href]').length > 5, null, { timeout: 15000 }).catch(() => {});
  await tidy(page);
}

async function setRoleCookie(page, roleId) {
  await page.context().addCookies([{
    name: 'role_id',
    value: String(roleId),
    url: BASE_URL,
  }]);
  await page.evaluate((id) => {
    document.cookie = 'role_id=' + id + '; path=/';
  }, String(roleId));
}

async function openDropdownMenus(page) {
  await page.evaluate(() => {
    document.querySelectorAll('#left-panel li.menu-item-has-children.dropdown').forEach((li) => {
      const toggle = li.querySelector('.dropdown-toggle');
      const menu = li.querySelector('.dropdown-menu');
      if (!toggle || !menu) return;
      if (getComputedStyle(li).display === 'none') return;
      li.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('show');
      menu.style.display = 'block';
    });
  }).catch(() => {});
  await sleep(400);
}

async function capture(page, records, name, kind, moduleName) {
  await waitForReady(page);
  await tidy(page);
  const filename = `${String(records.length + 1).padStart(3, '0')}-${slugify(name)}-${slugify(kind)}.png`;
  const dest = path.join(SCREENSHOT_DIR, filename);
  const modalVisible = await page.locator('.modal.show:visible').count().then((n) => n > 0).catch(() => false);
  await page.screenshot({
    path: dest,
    fullPage: !modalVisible,
    animations: 'disabled',
  });
  records.push({
    module: moduleName || name,
    name,
    kind,
    filename,
    url: page.url(),
  });
  console.log(`CAPTURED ${filename}`);
}

async function closeModal(page) {
  const modal = page.locator('.modal.show:visible').first();
  if (!(await modal.count().catch(() => 0))) return;
  await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary').first().click({ timeout: 2500 }).catch(() => {});
  await sleep(400);
}

async function clickAndCaptureAction(page, records, moduleName, selector, actionName) {
  const loc = page.locator(selector).first();
  if (!(await loc.count().catch(() => 0))) {
    console.log(`NO ${actionName} on ${moduleName}`);
    return false;
  }
  const before = page.url();
  await loc.scrollIntoViewIfNeeded().catch(() => {});
  await loc.click({ timeout: 6000, force: true }).catch(() => {});
  await sleep(1800);
  await waitForReady(page);
  await capture(page, records, `${moduleName} ${actionName}`, actionName, moduleName);
  const hasModal = await page.locator('.modal.show:visible').count().catch(() => 0);
  if (hasModal) {
    await closeModal(page);
  } else if (page.url() !== before) {
    await page.goto(before, { waitUntil: 'load', timeout: 25000 }).catch(() => {});
    await waitForReady(page);
    await waitForTableRows(page);
  }
  return true;
}

async function openFirstClientProfile(page, listRoute, linkSelector) {
  await page.goto(`${BASE_URL}${listRoute}`, { waitUntil: 'load', timeout: 25000 });
  await waitForReady(page);
  await waitForTableRows(page);
  const link = page.locator(linkSelector).first();
  if (!(await link.count().catch(() => 0))) return false;
  await link.click();
  await page.waitForURL(/client_view_factsheet/, { timeout: 20000 }).catch(() => {});
  await waitForReady(page);
  await sleep(1400);
  await tidy(page);
  return /client_view_factsheet/.test(page.url());
}

const pages = [
  ['Probation Investigation', 'investigation_docketing'],
  ['Probation Courtesy Investigation', 'probation-courtesy-investigation-list'],
  ['Probation Supervision', 'supervision_docketing'],
  ['Probation Courtesy Supervision', 'probation-courtesy-supervision-list'],
  ['Parole and Pardon Investigation', 'parole-pardon-investigation-list'],
  ['Parole and Pardon Courtesy Investigation', 'parole-pardon-courtesy-investigation-list'],
  ['Parole and Pardon Supervision', 'parole-pardon-supervision'],
  ['Parole and Pardon Courtesy Supervision', 'parole-pardon-courtesy-supervision-list'],
  ['PDL Routing', 'pdl-docket'],
  ['Sent PDL', 'pdl-sent'],
  ['Inbox PDL', 'pdl-receive'],
  ['Fact Sheet Probation', 'client_list'],
  ['Fact Sheet Parole and Pardone', 'client_list_parole_and_pardone'],
  ['Fact Sheet PDL', 'client_list_single_carpeta'],
  ['Forms', 'form_list'],
  ['User Accounts', 'user_accounts'],
  ['User Roles', 'user_roles'],
  ['Field Office', 'department'],
  ['Region', 'location'],
  ['Permission', 'permission'],
];

async function captureFactSheetProbation(page, records) {
  const opened = await openFirstClientProfile(page, 'client_list', 'table a[href*="client_view_factsheet"]');
  if (!opened) {
    console.log('SKIP fact sheet extras: no client profile link');
    return;
  }
  await capture(page, records, 'Fact Sheet Probation open client name', 'open client name', 'Fact Sheet Probation');
  await capture(page, records, 'Fact Sheet Probation client profile', 'client profile', 'Fact Sheet Probation');
  await capture(page, records, 'Fact Sheet Probation tabs', 'tabs', 'Fact Sheet Probation');

  if (await page.locator('.btn-photo:visible, [data-target="#uploadPicModal"]:visible').count()) {
    await page.locator('.btn-photo, [data-target="#uploadPicModal"]').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation upload photo', 'upload photo', 'Fact Sheet Probation');
    await closeModal(page);
  }
  if (await page.locator('.btn-take:visible, [data-target="#cameraModal"]:visible').count()) {
    await page.locator('.btn-take, [data-target="#cameraModal"]').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation take photo', 'take photo', 'Fact Sheet Probation');
    await closeModal(page);
  }
  if (await page.locator('.btn-fingerprint:visible').count()) {
    await page.locator('.btn-fingerprint').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation upload fingerprint', 'upload fingerprint', 'Fact Sheet Probation');
    await closeModal(page);
  }

  const docketTab = page.locator('#docketListTab, a:has-text("Docket List")').first();
  if (!(await docketTab.count())) return;
  await docketTab.click().catch(() => {});
  await sleep(2200);
  await waitForReady(page);
  await capture(page, records, 'Fact Sheet Probation worksheet and psir overview', 'docket list', 'Fact Sheet Probation');

  const printWs = page.locator('.btn_pdfWorksheet').first();
  if (await printWs.count()) {
    await printWs.click().catch(() => {});
    await sleep(2500);
    await capture(page, records, 'Fact Sheet Probation worksheet print', 'worksheet print', 'Fact Sheet Probation');
    await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
    await sleep(400);
  }
  const printPsir = page.locator('.btn_pdfPSIR').first();
  if (await printPsir.count()) {
    await printPsir.click().catch(() => {});
    await sleep(2500);
    await capture(page, records, 'Fact Sheet Probation psir print', 'psir print', 'Fact Sheet Probation');
    await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
    await sleep(400);
  }

  const editWs = page.locator('a.fs-edit-worksheet').first();
  if (await editWs.count()) {
    const href = await editWs.getAttribute('href');
    if (href) {
      await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 25000 }).catch(() => {});
      await waitForReady(page);
      await capture(page, records, 'Fact Sheet Probation fill out worksheet', 'worksheet editor', 'Fact Sheet Probation');
      const saveBtn = page.locator('.btn-saveData:visible').first();
      if (await saveBtn.count()) {
        await saveBtn.click().catch(() => {});
        await sleep(800);
        await capture(page, records, 'Fact Sheet Probation worksheet save changes', 'worksheet save dialog', 'Fact Sheet Probation');
        await closeModal(page);
      }
      await page.goBack().catch(() => {});
      await waitForReady(page);
      const docketTab2 = page.locator('#docketListTab, a:has-text("Docket List")').first();
      if (await docketTab2.count()) {
        await docketTab2.click().catch(() => {});
        await sleep(1800);
      }
    }
  }

  const editPsir = page.locator('a.fs-edit-psir').first();
  if (await editPsir.count()) {
    const href = await editPsir.getAttribute('href');
    if (href) {
      await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 25000 }).catch(() => {});
      await waitForReady(page);
      await capture(page, records, 'Fact Sheet Probation fill out psir', 'psir editor', 'Fact Sheet Probation');
      const saveBtn = page.locator('.btn-saveData:visible').first();
      if (await saveBtn.count()) {
        await saveBtn.click().catch(() => {});
        await sleep(800);
        await capture(page, records, 'Fact Sheet Probation psir save changes', 'psir save dialog', 'Fact Sheet Probation');
        await closeModal(page);
      }
    }
  }
}

async function captureFactSheetParole(page, records) {
  const opened = await openFirstClientProfile(
    page,
    'client_list_parole_and_pardone',
    'table a[href*="client_view_factsheet_parole_pardone"]'
  );
  if (!opened) {
    console.log('SKIP parole fact sheet extras: no client profile link');
    return;
  }
  await capture(page, records, 'Fact Sheet Parole and Pardon client profile', 'client profile', 'Fact Sheet Parole and Pardone');
  await capture(page, records, 'Fact Sheet Parole and Pardon client profile tabs', 'tabs', 'Fact Sheet Parole and Pardone');

  if (await page.locator('.btn-photo:visible, [data-target="#uploadPicModal"]:visible').count()) {
    await page.locator('.btn-photo, [data-target="#uploadPicModal"]').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Parole and Pardon upload photo', 'upload photo', 'Fact Sheet Parole and Pardone');
    await closeModal(page);
  }
  if (await page.locator('.btn-take:visible, [data-target="#cameraModal"]:visible').count()) {
    await page.locator('.btn-take, [data-target="#cameraModal"]').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Parole and Pardon take photo', 'take photo', 'Fact Sheet Parole and Pardone');
    await closeModal(page);
  }
  if (await page.locator('.btn-fingerprint:visible').count()) {
    await page.locator('.btn-fingerprint').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Parole and Pardon upload fingerprint', 'upload fingerprint', 'Fact Sheet Parole and Pardone');
    await closeModal(page);
  }

  const supervisionTab = page.locator('#supervisionTab').first();
  if (await supervisionTab.count()) {
    await supervisionTab.click().catch(() => {});
    await sleep(1400);
    await capture(page, records, 'Fact Sheet Parole and Pardon supervision tab', 'supervision tab', 'Fact Sheet Parole and Pardone');
  }
  const notesTab = page.locator('#otherDocumentsTab').first();
  if (await notesTab.count()) {
    await notesTab.click().catch(() => {});
    await sleep(1400);
    await capture(page, records, 'Fact Sheet Parole and Pardon notes other documents', 'notes tab', 'Fact Sheet Parole and Pardone');
  }
}

async function captureDocketFactSheetNav(page, records) {
  await page.goto(`${BASE_URL}investigation_docketing`, { waitUntil: 'load', timeout: 25000 });
  await waitForReady(page);
  await waitForTableRows(page);
  const btn = page.locator('.btn_factsheet').first();
  if (!(await btn.count().catch(() => 0))) {
    console.log('SKIP docket fact sheet: no Fact Sheet button');
    return;
  }
  await btn.scrollIntoViewIfNeeded().catch(() => {});
  await capture(page, records, 'Opening the Fact Sheet from a docket', 'fact sheet button', 'Docket Access');
  await btn.click({ timeout: 6000, force: true }).catch(() => {});
  await page.waitForURL(/client_view_factsheet/, { timeout: 20000 }).catch(() => {});
  await waitForReady(page);
  await sleep(1400);
  await capture(page, records, 'Opening the Fact Sheet from a docket result', 'client view profile', 'Docket Access');
}

async function captureUserAccountFallbacks(page, records) {
  await page.goto(`${BASE_URL}user_accounts`, { waitUntil: 'load', timeout: 25000 });
  await waitForReady(page);
  await waitForTableRows(page);
  if (!(await page.locator('.btn_update').count()) && await page.locator('#updateUserModal').count()) {
    await page.evaluate(() => window.jQuery && window.jQuery('#updateUserModal').modal('show'));
    await sleep(800);
    await capture(page, records, 'User Accounts Update', 'update', 'User Accounts');
    await closeModal(page);
  }
  if (!(await page.locator('.btn_remove').count()) && await page.locator('#removeModal').count()) {
    await page.evaluate(() => window.jQuery && window.jQuery('#removeModal').modal('show'));
    await sleep(800);
    await capture(page, records, 'User Accounts Remove confirmation', 'remove confirmation', 'User Accounts');
    await closeModal(page);
  }
}

async function main() {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
  const existing = await fs.readdir(SCREENSHOT_DIR).catch(() => []);
  await Promise.all(existing.filter((f) => f.endsWith('.png')).map((f) => fs.unlink(path.join(SCREENSHOT_DIR, f)).catch(() => {})));

  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      channel: 'chrome',
      args: ['--guest', '--disable-features=PasswordManagerOnboarding,PasswordCheck,AutofillServerCommunication'],
    });
  } catch (err) {
    browser = await chromium.launch({ headless: true });
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(12000);
  const records = [];
  const errors = [];

  try {
    await page.goto(BASE_URL, { waitUntil: 'load', timeout: 25000 });
    await waitForReady(page);
    await page.mouse.click(10, 10);
    await capture(page, records, 'Login', 'page', 'Login');
    await login(page);
    await openDropdownMenus(page);
    await capture(page, records, 'Main Navigation', 'expanded menus', 'Navigation');

    for (const [moduleName, route] of pages) {
      const url = `${BASE_URL}${route}`;
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 25000 });
        await waitForReady(page);
        await waitForTableRows(page);
        await capture(page, records, moduleName, 'list page', moduleName);
        if (await page.locator('table:visible').count().catch(() => 0)) {
          await clickAndCaptureAction(page, records, moduleName, '.btn_view', 'View');
          await clickAndCaptureAction(page, records, moduleName, '.btn_update', 'Update');
          await clickAndCaptureAction(page, records, moduleName, '.btn_attachments, .btn_upload', 'Attachments');
          await clickAndCaptureAction(page, records, moduleName, '.btn_remove, .btn_delete', 'Remove confirmation');
        }
        const addSelector = 'button:has-text("Add"), a:has-text("Add"), button:has-text("New"), a:has-text("New"), button:has-text("Add Record"), a:has-text("Add Record"), button:has-text("Add Document"), button:has-text("Add User"), button:has-text("Create")';
        if (await page.locator(addSelector).count().catch(() => 0)) {
          await clickAndCaptureAction(page, records, moduleName, addSelector, 'Add record');
        }
      } catch (err) {
        errors.push({ module: moduleName, route, message: err && err.message ? err.message : String(err) });
        console.log(`ERROR ${moduleName}: ${errors[errors.length - 1].message}`);
      }
    }

    try {
      await captureUserAccountFallbacks(page, records);
    } catch (err) {
      errors.push({ module: 'User Accounts fallback', message: String(err && err.message ? err.message : err) });
    }

    try {
      await captureDocketFactSheetNav(page, records);
    } catch (err) {
      errors.push({ module: 'Docket Fact Sheet', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Docket Fact Sheet: ${errors[errors.length - 1].message}`);
    }

    try {
      await setRoleCookie(page, '32');
      await captureFactSheetProbation(page, records);
    } catch (err) {
      errors.push({ module: 'Fact Sheet extras', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Fact Sheet extras: ${errors[errors.length - 1].message}`);
    }

    try {
      await setRoleCookie(page, '32');
      await captureFactSheetParole(page, records);
    } catch (err) {
      errors.push({ module: 'Fact Sheet Parole extras', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Fact Sheet Parole extras: ${errors[errors.length - 1].message}`);
    }
  } finally {
    await browser.close();
  }

  await fs.writeFile(CATALOG_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), records, errors }, null, 2));
  console.log(JSON.stringify({ screenshots: records.length, errors: errors.length, dir: SCREENSHOT_DIR }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
