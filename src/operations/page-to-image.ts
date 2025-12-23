import path from "path";
import puppeteer from "puppeteer";
import {getOutputDirPath} from '../utils'

const pngFile = "example.png";

export async function run() {
  const browser = await puppeteer.launch({ headless: true }); // Use true, false, or "shell"
 
  const page = await browser.newPage();
  await page.goto("https://vercel.com/blog/self-driving-infrastructure");
  // await page.goto("https://vercel.com/kb/bulletin/react2shell");
  // await page.goto("https://blog.apify.com/how-to-scrape-website");
  // await page.goto("https://www.post2video.com/privacy-policy");
  // await page.goto("https://example.com");
  // await page.goto("https://www.411.com/");

  const filePath = path.resolve(getOutputDirPath(), pngFile);

  await page.screenshot({ path: filePath , fullPage: true});
  console.log(`Screenshot is written to file: ${filePath}`);

  await browser.close();
}


