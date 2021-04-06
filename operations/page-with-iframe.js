const url = require("url");
const path = require("path");

const getUriLocalHtmlFile = () => {
  const fullpathIndexHtml = path.join(__dirname, "client", "index-with-iframe.html");
  // --- following is required only because the file is local
  // --- if your page is accessed by browser you can use http and not file
  const uriLocalHtmlFile = url.pathToFileURL(fullpathIndexHtml).href;
  console.log(uriLocalHtmlFile);

  return uriLocalHtmlFile;
};

async function run() {
  const puppeteer = require("puppeteer");
  // --- open browser and sleep 100 ms between operations
  const browser = await puppeteer.launch({ headless: true, slowMo: 100 });
  const page = await browser.newPage();

  await page.goto(getUriLocalHtmlFile());
  console.log("browser is opened with local file");


  // ******** now we are on the page   *********
  val = await page.$eval("body", elem => elem.innerHTML);
  console.log(`*********** body in page\n ${val}`);


  const frameHandle = await page.$("#iframe1");
  const frame = await frameHandle.contentFrame();
  frame.childFrames().forEach(childFrame => {
    console.log(`name of child frame : ${childFrame.name()}`);
  });
  val = await frame.$eval("body", elem => elem.innerHTML);
  console.log(`------------ body in iframe : ${val}`);

  await browser.close();
}

module.exports = { run };
