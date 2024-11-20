import puppeteer, { ElementHandle, Page } from "puppeteer";
import { getUriLocalHtmlFileInDataDir } from "../utils";

async function areElementsEqual(
  page: Page,
  element1: ElementHandle<Element>,
  element2: ElementHandle<Element>
): Promise<boolean> {
  const equal = await page.evaluate((e1, e2) => e1 === e2, element1, element2);
  return equal;
}

export async function run(): Promise<void> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = getUriLocalHtmlFileInDataDir("example.html");
  await page.goto(url);
  /* Get ElementHandles for all elements
   i am using page.$$ because you can not return Element[] from page.evaluate */
  const allElementHandles: ElementHandle<Element>[] = await page.$$("body *");
  const allElementHandles1: ElementHandle<Element>[] = await page.$$("body *");
  // -- simple == will not do
  const equal = await areElementsEqual(
    page,
    allElementHandles[0],
    allElementHandles1[0]
  );
  console.log(equal);

  console.log(`Found ${allElementHandles.length} elements in body`);
  // Example: Log the id of each element
  for (const elementHandle of allElementHandles) {
    const id = await elementHandle.evaluate((el) => el.id);
    console.log(`id : ${id}`);
    const rect = await elementHandle.evaluate((el) => {
      // CAUTION : return rect will return empty DOM object for some reason
      const rect = el.getBoundingClientRect();
      return { top: rect.top, height: rect.height }; // this is ok
    });
    console.log(rect);
  }
  await browser.close();
}
