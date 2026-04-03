import path from "path";
import puppeteer from "puppeteer-extra";
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker";
import { getOutputDirPath } from "../utils";

puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const DEV_TO_URL =
  "https://dev.to/sylwia-lask/9-things-youre-overengineering-the-browser-already-solved-them-o99";

export async function run() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(DEV_TO_URL, { waitUntil: "networkidle2" });

  const filePath = path.resolve(getOutputDirPath(), "devto-adblocker.png");
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`Screenshot saved to: ${filePath}`);

  await browser.close();
}
