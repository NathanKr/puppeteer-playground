import puppeteer from "puppeteer";

const pngFile = "example.png";

export async function run() {
  const browser = await puppeteer.launch({ headless: true }); // Use true, false, or "shell"
  const page = await browser.newPage();
  await page.goto("https://example.com");
  // await page.goto("https://www.411.com/");

  await page.screenshot({ path: pngFile });
  console.log(`Screenshot is written to file: ${pngFile}`);

  await browser.close();
}
