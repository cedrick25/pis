const fs = require('fs/promises');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost/pis/';
const USERNAME = 'jssantos';
const PASSWORD = 'Dojppa2022';
const ROOT = process.cwd();
const SCREENSHOT_DIR = path.join(ROOT, 'PIS_End_User_Manual_Screenshots');
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
  await page.waitForFunction(() => document.fonts ? document.fonts.ready.then(() => true) : true, null, { timeout: 5000 }).catch(() => {});
  await sleep(1000);
}

async function login(page) {
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 20000 });
  await waitForReady(page);
  await page.evaluate(() => localStorage.setItem('api', 'http://localhost/'));
  await page.locator('input.email').fill(USERNAME);
  await page.locator('input.password').fill(PASSWORD);
  await page.locator('.btn-confirm').click();
  await page.waitForURL(/\/pis\/(investigation_docketing|dashboard)/, { timeout: 25000 }).catch(() => {});
  await waitForReady(page);
}

function normalizeRoute(href) {
  if (!href || href === '#' || href === '#!') return null;
  try {
    const url = new URL(href, BASE_URL);
    const segment = url.pathname.replace(/^\/pis\/?/i, '').replace(/\/$/, '').toLowerCase();
    return segment || null;
  } catch {
    return null;
  }
}

async function collectVisibleNavRoutes(page) {
  await waitForReady(page);
  return page.evaluate(() => {
    const visible = (el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    };
    const routes = new Set();
    document.querySelectorAll('#left-panel a[href]').forEach((a) => {
      if (!visible(a)) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('javascript:')) return;
      routes.add(href);
    });
    return [...routes];
  }).then((hrefs) => {
    const routes = new Set();
    for (const href of hrefs) {
      const route = normalizeRoute(href);
      if (route) routes.add(route);
    }
    return routes;
  }).catch(() => new Set());
}

async function openDropdownMenus(page) {
  await page.evaluate(() => {
    const isPermissionVisible = (el) => getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden';
    document.querySelectorAll('#left-panel li.menu-item-has-children.dropdown').forEach((li) => {
      const toggle = li.querySelector('.dropdown-toggle');
      const menu = li.querySelector('.dropdown-menu');
      if (!toggle || !menu || !isPermissionVisible(li)) return;
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
      const label = clean(el.closest('.form-group')?.querySelector('label')?.textContent || el.getAttribute('placeholder') || el.name || el.id || el.className);
      if (label) out.fields.push(label);
    });
    document.querySelectorAll('table').forEach((table) => {
      if (!visible(table)) return;
      const headers = Array.from(table.querySelectorAll('thead th')).map((th) => clean(th.textContent)).filter(Boolean);
      out.tables.push(headers.slice(0, 8).join(', ') || 'Data table');
    });
    document.querySelectorAll('.nav-tabs .nav-link, [role=tab]').forEach((el) => {
      if (visible(el)) out.tabs.push(clean(el.textContent));
    });
    document.querySelectorAll('.modal.show, .modal').forEach((el) => {
      const label = clean(el.querySelector('.modal-title')?.textContent || el.id);
      if (label) out.modals.push(label);
    });
    for (const key of Object.keys(out)) out[key] = [...new Set(out[key].filter(Boolean))].slice(0, 12);
    return out;
  }).catch(() => ({}));
}

async function capture(page, records, name, kind, moduleName) {
  await waitForReady(page);
  const safeName = `${String(records.length + 1).padStart(3, '0')}-${slugify(name)}-${slugify(kind)}`;
  const filename = `${safeName}.png`;
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, filename), fullPage: true });
  records.push({
    module: moduleName || name,
    name,
    kind,
    filename,
    url: page.url(),
    controls: await collectControls(page),
  });
  console.log(`CAPTURED ${filename}`);
}

async function clickAndCaptureAction(page, records, moduleName, selector, actionName) {
  const count = await page.locator(selector).count().catch(() => 0);
  if (!count) return false;
  const before = page.url();
  await page.locator(selector).first().click({ timeout: 5000 }).catch(() => {});
  await sleep(1600);
  const hasModal = await page.locator('.modal.show:visible').count().catch(() => 0);
  const pageTitle = await titleFromPage(page, `${moduleName} ${actionName}`);
  await capture(page, records, `${moduleName} ${actionName}`, actionName, moduleName);
  if (hasModal) {
    await page.locator('.modal.show [data-dismiss="modal"], .modal.show .close').first().click({ timeout: 2000 }).catch(() => {});
    await sleep(600);
  } else if (page.url() !== before) {
    await page.goto(before, { waitUntil: 'load', timeout: 20000 }).catch(() => {});
    await waitForReady(page);
  }
  return !!pageTitle;
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
  ['Docket Routing Probation', 'docket_routing'],
  ['Docket Routing Pre-Parole', 'pre-parole-docketing-start'],
  ['Docket Routing Parole', 'docket_routing_parolee'],
  ['Docket Routing Pardone', 'pardonee_docket_routing'],
  ['PDL Routing', 'pdl-docket'],
  ['Sent Probation', 'sent'],
  ['Sent Pre-Parole', 'pre-parole-docketing-sent'],
  ['Sent Parole', 'sent_parolee'],
  ['Sent Pardone', 'sent_pardonee'],
  ['Sent PDL', 'pdl-sent'],
  ['Inbox Probation', 'received'],
  ['Inbox Pre-Parole', 'pre-parole-docketing-inbox'],
  ['Inbox Parole', 'received_parolee'],
  ['Inbox Pardone', 'received_pardonee'],
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
    const visibleRoutes = await collectVisibleNavRoutes(page);
    console.log(`Visible sidebar routes (${visibleRoutes.size}): ${[...visibleRoutes].sort().join(', ')}`);
    await capture(page, records, 'Main Navigation', 'expanded menus', 'Navigation');

    const modulesToCapture = pages.slice(1).filter(([, route]) => visibleRoutes.has(route.toLowerCase()));
    const skipped = pages.slice(1).filter(([, route]) => !visibleRoutes.has(route.toLowerCase()));
    if (skipped.length) {
      console.log(`Skipping hidden modules: ${skipped.map(([name]) => name).join(', ')}`);
    }

    for (const [moduleName, route] of modulesToCapture) {
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
