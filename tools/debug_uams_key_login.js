const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage();
  const key = 'anNZYW50b3NAcHJvYmF0aW9uLmdvdi5waA==.RG9qcHBhMjAyMg==';
  await page.goto('http://localhost/pis/?key=' + key, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const result = await page.evaluate(() => {
    const prompt = document.querySelector('#prompt, .prompt');
    return {
      url: location.href,
      prompt: prompt ? prompt.innerText.trim() : '',
      otpVisible: !!(document.querySelector('.OTP_div') && document.querySelector('.OTP_div').offsetParent),
      loginVisible: !!(document.querySelector('.login_div') && document.querySelector('.login_div').offsetParent)
    };
  });
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
