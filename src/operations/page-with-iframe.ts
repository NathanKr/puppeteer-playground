import puppeteer from "puppeteer";
import url from "url";
import path from "path";

const getUriLocalHtmlFile = (): string => {
  const fullpathIndexHtml = path.join(__dirname, "client", "index-with-iframe.html");
  // --- following is required only because the file is local
  // --- if your page is accessed by browser you can use http and not file
  const uriLocalHtmlFile = url.pathToFileURL(fullpathIndexHtml).href;
  console.log(uriLocalHtmlFile);

  return uriLocalHtmlFile;
};

export async function run() {
  const browser = await puppeteer.launch({ headless: true, slowMo: 100 });
  const page = await browser.newPage();

  await page.goto(getUriLocalHtmlFile());
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
