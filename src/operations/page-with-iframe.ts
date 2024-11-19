import puppeteer from "puppeteer";
import { getUriLocalHtmlFileInDataDir } from "../utils";

export async function run() {
  const browser = await puppeteer.launch({ headless: true, slowMo: 100 });
  const page = await browser.newPage();
  const url = getUriLocalHtmlFileInDataDir("index-with-iframe.html")
  await page.goto(url);
  console.log("browser is opened with local file");

  // ******** now we are on the page   *********
  const val = await page.$eval("body", elem => elem.innerHTML);
  console.log(`*********** body in page\n ${val}`);

  const frameHandle = await page.$("#iframe1");
  const frame = await frameHandle?.contentFrame();
  frame?.childFrames().forEach(childFrame => {
    console.log(`name of child frame : ${childFrame.name()}`);
  });
  const iframeVal = await frame?.$eval("body", elem => elem.innerHTML);
  console.log(`------------ body in iframe : ${iframeVal}`);

  await browser.close();
}
