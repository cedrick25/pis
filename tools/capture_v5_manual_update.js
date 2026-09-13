const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = process.env.PIS_MANUAL_USER || 'jssantos@probation.gov.ph';
const PASSWORD = process.env.PIS_MANUAL_PASS || 'Dojppa2022';
const ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots_20260910');
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
  }).catch(() => {});
}

async function waitForReady(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 20000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
  await sleep(900);
  await tidy(page);
  await expandLeftPanel(page);
}

async function waitForTableRows(page) {
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll('table tbody tr');
    if (!rows.length) return false;
    const text = (rows[0].innerText || '').toLowerCase();
    if (text.includes('field office could not') || text.includes('no data') || text.includes('loading')) {
      return false;
    }
    return true;
  }, null, { timeout: 25000 }).catch(() => {});
  await page.waitForSelector('.btn_view, .btn_update, .btn_factsheet, a[href*="client_view_factsheet"], .btn-saveData, table tbody tr td', { timeout: 12000 }).catch(() => {});
  await sleep(900);
  await tidy(page);
  await expandLeftPanel(page);
}

async function expandLeftPanel(page) {
  await page.evaluate(() => {
    document.body.classList.remove('open');
    const panel = document.getElementById('left-panel');
    if (panel) {
      panel.classList.remove('open');
      panel.style.display = '';
    }
  }).catch(() => {});
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
  if (typeof page.evaluate === 'function') {
    await page.waitForFunction(() => {
      return document.querySelectorAll('#left-panel a[href]').length > 5;
    }, null, { timeout: 15000 }).catch(() => {});
  }
  await expandLeftPanel(page);
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

async function collectControls(page) {
  return page.evaluate(() => {
    const visible = (el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    };
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const out = { buttons: [], fields: [], tables: [], tabs: [], modals: [] };
    document.querySelectorAll('button, .btn, input[type=button], input[type=submit]').forEach((el) => {
      if (!visible(el)) return;
      const value = clean(el.innerText || el.value || el.getAttribute('title') || el.getAttribute('aria-label'));
      if (value) out.buttons.push(value);
    });
    document.querySelectorAll('.nav-tabs .nav-link, [role=tab]').forEach((el) => {
      if (visible(el)) out.tabs.push(clean(el.textContent));
    });
    for (const key of Object.keys(out)) out[key] = [...new Set(out[key].filter(Boolean))].slice(0, 20);
    return out;
  }).catch(() => ({}));
}

async function capture(page, records, name, kind, moduleName, options) {
  await waitForReady(page);
  await tidy(page);
  const safeName = `${String(records.length + 1).padStart(3, '0')}-${slugify(name)}-${slugify(kind)}`;
  const filename = `${safeName}.png`;
  const dest = path.join(SCREENSHOT_DIR, filename);
  const modal = page.locator('.modal.show:visible').first();
  const hasModal = await modal.count().then((n) => n > 0).catch(() => false);
  if (hasModal && await modal.isVisible().catch(() => false)) {
    await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
  } else if (options && options.fullPage) {
    await page.screenshot({ path: dest, fullPage: true, animations: 'disabled' });
  } else {
    await page.screenshot({ path: dest, fullPage: false, animations: 'disabled' });
  }
  const record = {
    module: moduleName || name,
    name,
    kind,
    filename,
    url: page.url(),
    controls: await collectControls(page),
  };
  records.push(record);
  console.log(`CAPTURED ${filename}`);
  return record;
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

const pages = [
  ['Dashboard', 'dashboard'],
  ['Probation Investigation', 'investigation_docketing'],
  ['Probation Courtesy Investigation', 'probation-courtesy-investigation-list'],
  ['Probation Supervision', 'supervision_docketing'],
  ['Probation Courtesy Supervision', 'probation-courtesy-supervision-list'],
  ['Parole and Pardon Investigation', 'parole-pardon-investigation-list'],
  ['Parole and Pardon Courtesy Investigation', 'parole-pardon-courtesy-investigation-list'],
  ['Parole and Pardon Supervision', 'parole-pardon-supervision'],
  ['Parole and Pardon Courtesy Supervision', 'parole-pardon-courtesy-supervision-list'],
  ['Fact Sheet Probation', 'client_list'],
  ['Fact Sheet Parole and Pardone', 'client_list_parole_and_pardone'],
  ['Forms', 'form_list'],
  ['User Accounts', 'user_accounts'],
  ['User Roles', 'user_roles'],
  ['Field Office', 'department'],
  ['Region', 'location'],
  ['Permission', 'permission'],
];

const docketModules = new Set([
  'Probation Investigation',
  'Probation Courtesy Investigation',
  'Probation Supervision',
  'Probation Courtesy Supervision',
  'Parole and Pardon Investigation',
  'Parole and Pardon Courtesy Investigation',
  'Parole and Pardon Supervision',
  'Parole and Pardon Courtesy Supervision',
]);

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

async function captureFactSheetProbation(page, records) {
  const opened = await openFirstClientProfile(page, 'client_list', 'table a[href*="client_view_factsheet"]');
  if (!opened) {
    console.log('SKIP fact sheet extras: no client profile link');
    return;
  }
  await capture(page, records, 'Fact Sheet Probation click client name', 'click client name', 'Fact Sheet Probation', { fullPage: true });
  await capture(page, records, 'Fact Sheet Probation client view profile', 'client view profile', 'Fact Sheet Probation', { fullPage: true });
  await capture(page, records, 'Fact Sheet Tabs', 'tabs', 'Fact Sheet Probation', { fullPage: true });

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
  if (await docketTab.count()) {
    await docketTab.click().catch(() => {});
    await sleep(2200);
    await waitForReady(page);
    await capture(page, records, 'Fact Sheet Probation Worksheet and PSIR Overview', 'docket list', 'Fact Sheet Probation', { fullPage: true });
    await capture(page, records, 'Fact Sheet Probation Navigate to Worksheet', 'docket worksheet', 'Fact Sheet Probation', { fullPage: true });
    await capture(page, records, 'Fact Sheet Probation Navigate to PSIR', 'docket psir', 'Fact Sheet Probation', { fullPage: true });

    const printWs = page.locator('.btn_pdfWorksheet').first();
    if (await printWs.count()) {
      await printWs.click().catch(() => {});
      await sleep(2500);
      await capture(page, records, 'Fact Sheet Probation Worksheet Print Out Sample', 'worksheet print', 'Fact Sheet Probation');
      await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
      await sleep(400);
    }

    const printPsir = page.locator('.btn_pdfPSIR').first();
    if (await printPsir.count()) {
      await printPsir.click().catch(() => {});
      await sleep(2500);
      await capture(page, records, 'Fact Sheet Probation PSIR Print Out Sample', 'psir print', 'Fact Sheet Probation');
      await page.locator('#closePreview, #pdfPreviewModal .close').first().click().catch(() => {});
      await sleep(400);
    }

    const editWs = page.locator('a.fs-edit-worksheet').first();
    if (await editWs.count()) {
      const href = await editWs.getAttribute('href');
      if (href) {
        await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 25000 }).catch(() => {});
        await waitForReady(page);
        await capture(page, records, 'Fact Sheet Probation Fill Out Worksheet', 'worksheet editor', 'Fact Sheet Probation', { fullPage: true });
        const saveBtn = page.locator('.btn-saveData:visible').first();
        if (await saveBtn.count()) {
          await saveBtn.click().catch(() => {});
          await sleep(800);
          await capture(page, records, 'Fact Sheet Probation Worksheet Save Changes', 'worksheet save dialog', 'Fact Sheet Probation');
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
        await capture(page, records, 'Fact Sheet Probation Fill Out PSIR', 'psir editor', 'Fact Sheet Probation', { fullPage: true });
        const saveBtn = page.locator('.btn-saveData:visible').first();
        if (await saveBtn.count()) {
          await saveBtn.click().catch(() => {});
          await sleep(800);
          await capture(page, records, 'Fact Sheet Probation PSIR Save Changes', 'psir save dialog', 'Fact Sheet Probation');
          await closeModal(page);
        }
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
  await capture(page, records, 'Fact Sheet Parole and Pardon click client name', 'click client name', 'Fact Sheet Parole and Pardone', { fullPage: true });
  await capture(page, records, 'Fact Sheet Parole and Pardon client view profile', 'client view profile', 'Fact Sheet Parole and Pardone', { fullPage: true });
  await capture(page, records, 'Fact Sheet Parole and Pardon client profile tabs', 'tabs', 'Fact Sheet Parole and Pardone', { fullPage: true });

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
    await capture(page, records, 'Fact Sheet Parole and Pardon supervision tab', 'supervision tab', 'Fact Sheet Parole and Pardone', { fullPage: true });
  }

  const notesTab = page.locator('#otherDocumentsTab').first();
  if (await notesTab.count()) {
    await notesTab.click().catch(() => {});
    await sleep(1400);
    await capture(page, records, 'Fact Sheet Parole and Pardon notes other documents', 'notes tab', 'Fact Sheet Parole and Pardone', { fullPage: true });
  }
}

async function captureRoleWorkflows(page, records) {
  const variants = [
    { roleId: '32', label: 'CPPO', caption: 'CPPO fact sheet full access' },
    { roleId: '4', label: 'Field Officer', caption: 'Field Officer fact sheet owner scoped' },
    { roleId: '99', label: 'Clerk or Other', caption: 'Clerk other fact sheet restricted' },
  ];

  for (const variant of variants) {
    await setRoleCookie(page, variant.roleId);
    const opened = await openFirstClientProfile(page, 'client_list', 'table a[href*="client_view_factsheet"]');
    if (!opened) {
      console.log(`SKIP role ${variant.label}: no client`);
      continue;
    }
    await capture(page, records, `${variant.caption} client profile`, 'client profile', variant.label, { fullPage: true });
    const docketTab = page.locator('#docketListTab, a:has-text("Docket List")').first();
    if (await docketTab.count()) {
      await docketTab.click().catch(() => {});
      await sleep(2000);
      await capture(page, records, `${variant.caption} docket list`, 'docket list', variant.label, { fullPage: true });
    }
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
  await capture(page, records, 'Opening the Fact Sheet from a docket result', 'client view profile', 'Docket Access', { fullPage: true });
}

async function main() {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: 'chrome' });
  } catch (err) {
    browser = await chromium.launch({ headless: true });
  }
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
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
        const kind = moduleName === 'Dashboard' ? 'list page' : 'list page';
        await capture(page, records, moduleName, kind, moduleName);
        const isRecordList = await page.locator('table:visible').count().catch(() => 0);
        if (isRecordList) {
          await clickAndCaptureAction(page, records, moduleName, '.btn_view', 'View');
          await clickAndCaptureAction(page, records, moduleName, '.btn_update', 'Update');
          await clickAndCaptureAction(page, records, moduleName, '.btn_attachments, .btn_upload', 'Attachments');
          await clickAndCaptureAction(page, records, moduleName, '.btn_remove, .btn_delete', 'Remove confirmation');
        }
        const addSelector = 'button:has-text("Add"), a:has-text("Add"), button:has-text("New"), a:has-text("New"), button:has-text("Add Record"), a:has-text("Add Record"), button:has-text("Add Document")';
        if (await page.locator(addSelector).count().catch(() => 0)) {
          await clickAndCaptureAction(page, records, moduleName, addSelector, 'Add record');
        }
      } catch (err) {
        errors.push({ module: moduleName, route, message: err && err.message ? err.message : String(err) });
        console.log(`ERROR ${moduleName}: ${errors[errors.length - 1].message}`);
      }
    }

    try {
      await captureDocketFactSheetNav(page, records);
    } catch (err) {
      errors.push({ module: 'Docket Fact Sheet', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Docket Fact Sheet: ${errors[errors.length - 1].message}`);
    }

    try {
      await captureFactSheetProbation(page, records);
    } catch (err) {
      errors.push({ module: 'Fact Sheet extras', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Fact Sheet extras: ${errors[errors.length - 1].message}`);
    }

    try {
      await captureFactSheetParole(page, records);
    } catch (err) {
      errors.push({ module: 'Fact Sheet Parole extras', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Fact Sheet Parole extras: ${errors[errors.length - 1].message}`);
    }

    try {
      await captureRoleWorkflows(page, records);
    } catch (err) {
      errors.push({ module: 'Role workflows', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Role workflows: ${errors[errors.length - 1].message}`);
    }
  } finally {
    await browser.close();
  }

  await fs.writeFile(CATALOG_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), records, errors }, null, 2));
  console.log(JSON.stringify({ screenshots: records.length, errors: errors.length, catalog: CATALOG_FILE }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
