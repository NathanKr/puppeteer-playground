import { readFileSync, unlinkSync, writeFileSync } from "fs";
import { resolve } from "path";
import puppeteer from "puppeteer";
import { DATA_DIR } from "../constants";

export async function run() {
  // Read the markdown file
  const fileName = 'md-with-local-img'
  const mdFilePath = resolve('.', DATA_DIR, `${fileName}.md`);
  const mdContent = readFileSync(mdFilePath, "utf8");

  // Create a simple HTML content with the markdown content
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Preview</title>
    </head>
    <body>
    <div id="markdown-content">${mdContent}</div>
    </body>
    </html>
  `;

  // Save the HTML to a temporary file
  /* This is crucial for using local image files because it provide the html
   file by which relative path can be accessed */
  const tempHtmlPath = resolve('.', `${fileName}-temp.html`);
  writeFileSync(tempHtmlPath, htmlContent);

  try {
    (async () => {
      // Launch a browser instance
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
  
      // Load the HTML file
      await page.goto(`file://${tempHtmlPath}`);
  
      // Check if the image is loaded
      const isImageLoaded = await page.evaluate(() => {
        const img = document.querySelector("img");
        return img && img.complete && img.naturalHeight !== 0;
      });
  
      if (isImageLoaded) {
        console.log("Image is loaded.");
      } else {
        console.log("Image is not loaded.");
      }
  
      // Close the browser
      await browser.close();
    })();
  } finally  {
    unlinkSync(tempHtmlPath);
    console.log(`Temporary HTML file ${tempHtmlPath} deleted`);
  }
}

