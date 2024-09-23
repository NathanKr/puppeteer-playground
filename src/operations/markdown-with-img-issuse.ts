// import path from "path";
// import puppeteer from "puppeteer";
// import { getOutputDirPath, mdFilePath } from "../utils";
// import { README_WITH_IMG_PROBLEM } from "../constants";
// import fs from 'fs';
// import { marked } from "marked";

// const pngFile = `${README_WITH_IMG_PROBLEM}.png`;

// export async function run() {
//   // Read the Markdown file
//   const markdown = fs.readFileSync(mdFilePath, "utf8");

//   // Convert Markdown to HTML
//   const browser = await puppeteer.launch({ headless: true }); // Use true, false, or "shell"
//   const page = await browser.newPage();
//   const htmlContent = await marked.parse(markdown);
//   // Set the HTML content
//   await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

//   const filePath = path.resolve(getOutputDirPath(), pngFile);

//   await page.screenshot({ path: filePath , fullPage: true });
//   console.log(`Screenshot is written to file: ${filePath}`);

//   await browser.close();
// }
import path from "path";
import puppeteer from "puppeteer";
import { getOutputDirPath, mdFilePath } from "../utils";
import { README_WITH_IMG_PROBLEM } from "../constants";
import fs from 'fs';
import { marked } from "marked";

const pngFile = `${README_WITH_IMG_PROBLEM}.png`;

export async function run() {
  // Read the Markdown file
  const markdown = fs.readFileSync(mdFilePath, "utf8");

  // Convert Markdown to HTML
  const browser = await puppeteer.launch({ headless: true }); // Use true, false, or "shell"
  const page = await browser.newPage();
  const htmlContent = await marked.parse(markdown);

  // Set the HTML content and wait for network idle
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Wait for all images to load
  await page.waitForSelector('img', { visible: true });
  
  // Take the screenshot
  const filePath = path.resolve(getOutputDirPath(), pngFile);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`Screenshot is written to file: ${filePath}`);

  // Close the browser
  await browser.close();
}