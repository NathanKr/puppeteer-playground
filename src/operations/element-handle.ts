import puppeteer, { ElementHandle } from "puppeteer";
import { getUriLocalHtmlFileInDataDir } from "../utils";

export async function run(): Promise<void> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = getUriLocalHtmlFileInDataDir("example.html");
  await page.goto(url);
  // Get ElementHandles for all elements
  const allElementHandles: ElementHandle<Element>[] = await page.$$("body *");
  console.log(`Found ${allElementHandles.length} elements in body`);
  // Example: Log the id of each element
  for (const elementHandle of allElementHandles) {
    const id = await elementHandle.evaluate((el) => el.id);
    console.log(`id : ${id}`);
  }
  await browser.close();
}
