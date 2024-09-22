"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const puppeteer_1 = __importDefault(require("puppeteer"));
const url_1 = __importDefault(require("url"));
const path_1 = __importDefault(require("path"));
const getUriLocalHtmlFile = () => {
    const fullpathIndexHtml = path_1.default.join(__dirname, "client", "index-with-iframe.html");
    // --- following is required only because the file is local
    // --- if your page is accessed by browser you can use http and not file
    const uriLocalHtmlFile = url_1.default.pathToFileURL(fullpathIndexHtml).href;
    console.log(uriLocalHtmlFile);
    return uriLocalHtmlFile;
};
async function run() {
    const browser = await puppeteer_1.default.launch({ headless: true, slowMo: 100 });
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
//# sourceMappingURL=page-with-iframe.js.map