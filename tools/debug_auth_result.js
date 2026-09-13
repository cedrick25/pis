const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage();
  await page.goto('http://localhost/pis/', { waitUntil: 'load' });
  const result = await page.evaluate(async () => {
    const api = localStorage.getItem('api') || window.__PIS_API_BASE;
    const res = await fetch(api + '8088/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ encoded: false, username: 'jssantos@probation.gov.ph', password: 'Dojppa2022' })
    });
    const json = await res.json();
    return {
      status: res.status,
      authenticated: json.authenticated,
      isLocked: json.isLocked,
      failedAttemptsCount: json.failedAttemptsCount,
      hasUuid: !!json.uuid,
      keys: Object.keys(json || {})
    };
  });
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
