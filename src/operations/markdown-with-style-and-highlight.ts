import path from "path";
import puppeteer from "puppeteer";
import { getDataDirPath, getOutputDirPath, mdFilePath } from "../utils";
import { README_WITH_IMG } from "../constants";
import fs from "fs";
import { marked } from "marked";

const pngFile = `${README_WITH_IMG}.png`;

export async function run() {
  // Read the Markdown file
  const markdown = fs.readFileSync(mdFilePath, "utf8");

  // Convert Markdown to HTML
  const browser = await puppeteer.launch({ headless: true }); // Use true, false, or "shell"
  const page = await browser.newPage();
  const htmlContent = await marked.parse(markdown);

  // Read the CSS file
  const cssPath = path.join(getDataDirPath(), "markdown-file-styles.css");
  const cssContent = fs.readFileSync(cssPath, "utf8");

  // HTML content with a link to the CSS file
  const content = `
    <html>
      <head>
        <style>${cssContent}</style>
        <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/vs.min.css"
    />
      </head>
      <body>
        <div class='container'>
        ${htmlContent}
        <div>
        <script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js"
      ></script>
      <script>
        hljs.highlightAll();
      </script> 
      </body>
    </html>
  `;

  // Set the HTML content and wait for network idle
  await page.setContent(content, { waitUntil: "networkidle0" });

  // Wait for all images to load
  await page.waitForSelector("img", { visible: true });

  // Take the screenshot
  const filePath = path.resolve(getOutputDirPath(), pngFile);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`Screenshot is written to file: ${filePath}`);

  // Close the browser
  await browser.close();
}
