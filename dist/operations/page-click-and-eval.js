"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const url_1 = require("url");
const path_1 = require("path");
const puppeteer_1 = __importDefault(require("puppeteer"));
const getUriLocalHtmlFile = () => {
    const fullpathIndexHtml = (0, path_1.join)(__dirname, 'client', 'index.html');
    // --- following is required only because the file is local
    // --- if your page is accessed by browser you can use http and not file
    const uriLocalHtmlFile = (0, url_1.pathToFileURL)(fullpathIndexHtml).href;
    console.log(uriLocalHtmlFile);
    return uriLocalHtmlFile;
};
async function run() {
    // --- open browser and sleep 100 ms between operations
    const browser = await puppeteer_1.default.launch({ headless: false, slowMo: 100 });
    const page = await browser.newPage();
    await page.goto(getUriLocalHtmlFile());
    console.log('browser is opened with local file');
    // ******** now we are on the page   *********
    // -- use button selector and click on it
    await page.click('body > button');
    // -- use input selector and write into it
    await page.type('body > input', 'hello from pup !');
    // --- evaluate value of input
    const val = await page.$eval('body > input', elem => elem.value);
    // --- check in node console
    console.log(`value of input : ${val}`);
    await browser.close();
}
//# sourceMappingURL=page-click-and-eval.js.map