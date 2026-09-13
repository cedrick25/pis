const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = 'jssantos';
const PASSWORD = 'Dojppa2022';
const ROOT = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots_20260907');
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

async function waitForReady(page) {
  await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  await sleep(800);
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 20000 });
  await waitForReady(page);
  await page.evaluate(() => localStorage.setItem('api', 'http://localhost/'));
  await page.locator('input.email').fill(USERNAME);
  await page.locator('input.password').fill(PASSWORD);
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\/(investigation_docketing|dashboard|client_list)/, { timeout: 25000 }).catch(() => {});
  await waitForReady(page);
}

async function setRoleCookie(page, roleId) {
  await page.context().addCookies([{
    name: 'role_id',
    value: String(roleId),
    url: BASE_URL,
    path: '/',
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
      li.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('show');
      menu.style.display = 'block';
    });
  }).catch(() => {});
  await sleep(300);
}

async function titleFromPage(page, fallback) {
  const title = await page.evaluate(() => {
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const selectors = ['.card-header strong', '.page-title h1', '.breadcrumbs h1', 'h1', 'h2', 'h3'];
    for (const selector of selectors) {
      for (const el of document.querySelectorAll(selector)) {
        const value = clean(el.textContent);
        if (value && value.length < 100) return value;
      }
    }
    return '';
  }).catch(() => '');
  return title || fallback;
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
    document.querySelectorAll('input, textarea, select').forEach((el) => {
      if (!visible(el) || (el.type || '').toLowerCase() === 'hidden') return;
      const label = clean(el.closest('.form-group')?.querySelector('label')?.textContent || el.getAttribute('placeholder') || el.name || el.id);
      if (label) out.fields.push(label);
    });
    document.querySelectorAll('.nav-tabs .nav-link, [role=tab]').forEach((el) => {
      if (visible(el)) out.tabs.push(clean(el.textContent));
    });
    for (const key of Object.keys(out)) out[key] = [...new Set(out[key].filter(Boolean))].slice(0, 16);
    return out;
  }).catch(() => ({}));
}

async function capture(page, records, name, kind, moduleName) {
  await waitForReady(page);
  const safeName = `${String(records.length + 1).padStart(3, '0')}-${slugify(name)}-${slugify(kind)}`;
  const filename = `${safeName}.png`;
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename), fullPage: true });
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

async function clickAndCaptureAction(page, records, moduleName, selector, actionName) {
  const count = await page.locator(selector).count().catch(() => 0);
  if (!count) return false;
  const before = page.url();
  await page.locator(selector).first().click({ timeout: 5000 }).catch(() => {});
  await sleep(1600);
  const hasModal = await page.locator('.modal.show:visible').count().catch(() => 0);
  await titleFromPage(page, `${moduleName} ${actionName}`);
  await capture(page, records, `${moduleName} ${actionName}`, actionName, moduleName);
  if (hasModal) {
    await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close, .modal.show .btn-secondary').first().click({ timeout: 2000 }).catch(() => {});
    await sleep(400);
  } else if (page.url() !== before) {
    await page.goto(before, { waitUntil: 'load', timeout: 20000 }).catch(() => {});
    await waitForReady(page);
  }
  return true;
}

const pages = [
  ['Login', ''],
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

async function openFirstClientProfile(page) {
  await page.goto(`${BASE_URL}client_list`, { waitUntil: 'load', timeout: 25000 });
  await waitForReady(page);
  const link = page.locator('table a[href*="client_view_factsheet"]').first();
  if (!(await link.count().catch(() => 0))) return false;
  await link.click();
  await page.waitForURL(/client_view_factsheet/, { timeout: 20000 }).catch(() => {});
  await waitForReady(page);
  await sleep(1200);
  return page.url().includes('client_view_factsheet');
}

async function captureFactSheetExtras(page, records) {
  const opened = await openFirstClientProfile(page);
  if (!opened) {
    console.log('SKIP fact sheet extras: no client profile link');
    return;
  }
  await capture(page, records, 'Fact Sheet Probation client view profile', 'client view profile', 'Fact Sheet Probation');

  const tab = page.locator('.nav-tabs .nav-link, #myTab .nav-link, a[href="#investigation"]').first();
  if (await tab.count()) {
    await capture(page, records, 'Fact Sheet Probation client profile tabs', 'tabs', 'Fact Sheet Probation');
  }

  if (await page.locator('.btn-photo:visible, [data-target="#uploadPicModal"]:visible').count()) {
    await page.locator('.btn-photo, [data-target="#uploadPicModal"]').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation upload photo', 'upload photo', 'Fact Sheet Probation');
    await page.locator('#uploadPicModal [data-dismiss="modal"], #uploadPicModal .close').first().click().catch(() => {});
    await sleep(400);
  }

  if (await page.locator('.btn-take:visible, [data-target="#cameraModal"]:visible').count()) {
    await page.locator('.btn-take, [data-target="#cameraModal"]').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation take photo', 'take photo', 'Fact Sheet Probation');
    await page.locator('#cameraModal [data-dismiss="modal"], #cameraModal .close').first().click().catch(() => {});
    await sleep(400);
  }

  if (await page.locator('.btn-fingerprint:visible').count()) {
    await page.locator('.btn-fingerprint').first().click().catch(() => {});
    await sleep(800);
    await capture(page, records, 'Fact Sheet Probation upload fingerprint', 'upload fingerprint', 'Fact Sheet Probation');
    await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close').first().click().catch(() => {});
    await sleep(400);
  }

  const docketTab = page.locator('a[href="#docket"], a:has-text("Docket List")').first();
  if (await docketTab.count()) {
    await docketTab.click().catch(() => {});
    await sleep(1500);
    await capture(page, records, 'Fact Sheet Probation Worksheet and PSIR Overview', 'docket list', 'Fact Sheet Probation');
    await capture(page, records, 'Fact Sheet Probation Navigate to Worksheet', 'docket worksheet', 'Fact Sheet Probation');
    await capture(page, records, 'Fact Sheet Probation Navigate to PSIR', 'docket psir', 'Fact Sheet Probation');

    const editWs = page.locator('a.fs-edit-worksheet, a[href*="worksheet_identifying_data"]').first();
    if (await editWs.count()) {
      const href = await editWs.getAttribute('href');
      if (href) {
        await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 25000 }).catch(() => {});
        await waitForReady(page);
        await capture(page, records, 'Fact Sheet Probation Fill Out Worksheet', 'worksheet editor', 'Fact Sheet Probation');
        await page.goBack().catch(() => {});
        await waitForReady(page);
      }
    }

    const editPsir = page.locator('a.fs-edit-psir, a[href*="psir_identifying_data"]').first();
    if (await editPsir.count()) {
      const href = await editPsir.getAttribute('href');
      if (href) {
        await page.goto(new URL(href, BASE_URL).toString(), { waitUntil: 'load', timeout: 25000 }).catch(() => {});
        await waitForReady(page);
        await capture(page, records, 'Fact Sheet Probation Fill Out PSIR', 'psir editor', 'Fact Sheet Probation');
      }
    }
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
    const opened = await openFirstClientProfile(page);
    if (!opened) {
      console.log(`SKIP role ${variant.label}: no client`);
      continue;
    }
    await capture(page, records, `${variant.caption} client profile`, 'client profile', variant.label);
    const docketTab = page.locator('a[href="#docket"], a:has-text("Docket List")').first();
    if (await docketTab.count()) {
      await docketTab.click().catch(() => {});
      await sleep(1600);
      await capture(page, records, `${variant.caption} docket list`, 'docket list', variant.label);
    }
  }
}

async function main() {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const records = [];
  const errors = [];

  try {
    await page.goto(BASE_URL, { waitUntil: 'load', timeout: 20000 });
    await capture(page, records, 'Login', 'page', 'Login');
    await login(page);
    await openDropdownMenus(page);
    await capture(page, records, 'Main Navigation', 'expanded menus', 'Navigation');

    for (const [moduleName, route] of pages.slice(1)) {
      const url = `${BASE_URL}${route}`;
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 20000 });
        await waitForReady(page);
        await capture(page, records, moduleName, 'list page', moduleName);
        const isRecordList = await page.locator('table:visible').count().catch(() => 0);
        if (isRecordList) {
          await clickAndCaptureAction(page, records, moduleName, '.btn_view:visible', 'View');
          await clickAndCaptureAction(page, records, moduleName, '.btn_update:visible', 'Update');
          await clickAndCaptureAction(page, records, moduleName, '.btn_attachments:visible, .btn_upload:visible', 'Attachments');
          await clickAndCaptureAction(page, records, moduleName, '.btn_remove:visible, .btn_delete:visible', 'Remove confirmation');
        }
        const addSelector = 'button:has-text("Add"), a:has-text("Add"), button:has-text("New"), a:has-text("New")';
        if (await page.locator(addSelector).count().catch(() => 0)) {
          await clickAndCaptureAction(page, records, moduleName, addSelector, 'Add record');
        }
      } catch (err) {
        errors.push({ module: moduleName, route, message: err && err.message ? err.message : String(err) });
        console.log(`ERROR ${moduleName}: ${errors[errors.length - 1].message}`);
      }
    }

    try {
      await captureFactSheetExtras(page, records);
    } catch (err) {
      errors.push({ module: 'Fact Sheet extras', message: String(err && err.message ? err.message : err) });
      console.log(`ERROR Fact Sheet extras: ${errors[errors.length - 1].message}`);
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
