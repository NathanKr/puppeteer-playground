import puppeteer from "puppeteer";
import {getUriLocalHtmlFileInDataDir } from "../utils";

export async function run(): Promise<void> {
  // --- open browser and sleep 100 ms between operations
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  const url = getUriLocalHtmlFileInDataDir("index.html");
  await page.goto(url);
  console.log("browser is opened with local file");

  // ******** now we are on the page   *********

  // -- use button selector and click on it
  await page.click("body > button");

  // -- use input selector and write into it
  await page.type("body > input", "hello from pup !");

  // --- evaluate value of input
  const val = await page.$eval(
    "body > input",
    (elem) => (elem as HTMLInputElement).value
  );

  // --- check in node console
  console.log(`value of input : ${val}`);

  await browser.close();
}
