"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const puppeteer_1 = __importDefault(require("puppeteer"));
const pngFile = "example.png";
async function run() {
    const browser = await puppeteer_1.default.launch({ headless: true }); // Use true, false, or "shell"
    const page = await browser.newPage();
    await page.goto("https://example.com");
    // await page.goto("https://www.411.com/");
    await page.screenshot({ path: pngFile });
    console.log(`Screenshot is written to file: ${pngFile}`);
    await browser.close();
}
//# sourceMappingURL=page-to-image.js.map