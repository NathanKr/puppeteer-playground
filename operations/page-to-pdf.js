const puppeteer = require("puppeteer");

async function run() {
  const pdfFile = "example.pdf";
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(
    "https://9c9b-2a06-c701-4702-9300-7943-6979-ba22-fe03.ngrok-free.app/posts"
  );
  // await page.goto("http://example.com/");

  // await page.pdf({ path: pdfFile });


// Wait for the button with text "Apply New Filter" to appear
await page.waitForXPath("//*[text()='Apply New Filter']");

// Once the button is found it is good sign that the document is ready
 await page.$x("//*[text()='Apply New Filter']");

  await page.pdf({
    path: pdfFile,
    format: "A4",
    printBackground: true,
    fullPage: true,
  });
  console.log(`pdf is written to file : ${pdfFile}`);

  await browser.close();
}

module.exports = { run };
