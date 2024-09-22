"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const puppeteer_1 = __importDefault(require("puppeteer"));
const pdfFile = "example.pdf";
async function run() {
    const browser = await puppeteer_1.default.launch({ headless: true }); // Use true, false, or "shell"
    const page = await browser.newPage();
    await page.goto("https://f9ea-147-235-218-142.ngrok-free.app/posts");
    // await page.goto("http://example.com/");
    // Wait for the button with text "Apply New Filter" to appear
    await page.waitForSelector("xpath//*[text()='Apply New Filter']");
    // Once the button is found it is a good sign that the document is ready
    const [button] = await page.$$("xpath//*[text()='Apply New Filter']");
    await page.pdf({
        path: pdfFile,
        format: "A4",
        printBackground: true,
        width: '210mm',
        height: '297mm'
    });
    console.log(`PDF is written to file: ${pdfFile}`);
    await browser.close();
}
//# sourceMappingURL=page-to-pdf.js.map