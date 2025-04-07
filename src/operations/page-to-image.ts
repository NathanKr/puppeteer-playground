import path from "path";
import puppeteer from "puppeteer";
import {getOutputDirPath} from '../utils'

const pngFile = "example.png";

export async function run() {
  const browser = await puppeteer.launch({ headless: true }); // Use true, false, or "shell"
 
  const page = await browser.newPage();
  await page.goto("https://www.post2youtube.com");
  // await page.goto("https://example.com");
  // await page.goto("https://www.411.com/");

  const filePath = path.resolve(getOutputDirPath(), pngFile);

  await page.screenshot({ path: filePath , fullPage: true});
  console.log(`Screenshot is written to file: ${filePath}`);

  await browser.close();
}


