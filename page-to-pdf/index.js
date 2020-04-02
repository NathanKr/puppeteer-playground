const puppeteer = require('puppeteer');

(async () => {
  const pngFile = 'example.png';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: pngFile});
  console.log(`pdf is written to file : ${pngFile}`);
  
  await browser.close();
})();