const puppeteer = require("puppeteer-extra");

// Add stealth plugin and use defaults
const pluginStealth = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require("puppeteer");

async function run() {
  // Use stealth
  puppeteer.use(pluginStealth());

  // Launch pupputeer-stealth
  puppeteer
    .launch({ headless: false, executablePath: executablePath() })
    .then(async (browser) => {
      // Create a new page
      const page = await browser.newPage();

      // Setting page view
      await page.setViewport({ width: 1280, height: 720 });

      // Go to the website
      await page.goto("https://nowsecure.nl/");

      // Wait for security check
    //   await page.waitForTimeout(10000);
      await new Promise(r => setTimeout(r, 10000));

      const fileName = 'image.png';
      // Take screenshot 
      await page.screenshot({ path: fileName, fullPage: true }); 
  
      console.log(`check the screen shot in ${fileName}`);


      await browser.close();
    });
}

module.exports = { run };
