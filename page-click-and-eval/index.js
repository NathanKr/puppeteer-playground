console.log("app has started ...");
const url = require("url");
const path = require("path");

const getUriLocalHtmlFile = () => {
  const fullpathIndexHtml = path.join(__dirname, "client", "index.html");
  // --- following is required only because the file is local
  // --- if your page is accessed by browser you can use http and not file
  const uriLocalHtmlFile = url.pathToFileURL(fullpathIndexHtml).href;
  console.log(uriLocalHtmlFile);

  return uriLocalHtmlFile;
};

async function run() {
  const puppeteer = require("puppeteer");
  // --- open browser and sleep 100 ms between operations
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  await page.goto(getUriLocalHtmlFile());
  console.log('browser is opened with local file');

  // ******** now we are on the page   *********

  // -- use button selector and click on it
  await page.click("body > button");

  // -- use input selector and write into it
  await page.type("body > input", "hello from pup !");

  // --- evaluate value of input
  const val = await page.$eval("body > input", elem => elem.value);

  // --- check in node console
  console.log(`value of input : ${val}`);

  await browser.close();
}

run();
