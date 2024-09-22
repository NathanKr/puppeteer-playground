"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const puppeteer_1 = require("puppeteer");
async function run() {
    // Use stealth
    puppeteer_extra_1.default.use((0, puppeteer_extra_plugin_stealth_1.default)());
    // Launch puppeteer-stealth
    const browser = await puppeteer_extra_1.default.launch({ headless: false, executablePath: (0, puppeteer_1.executablePath)() });
    // Create a new page
    const page = await browser.newPage();
    // Setting page view
    await page.setViewport({ width: 1280, height: 720 });
    // Go to the website
    await page.goto('https://nowsecure.nl/');
    // Wait for security check
    await new Promise(r => setTimeout(r, 10000));
    const fileName = 'image.png';
    // Take screenshot
    await page.screenshot({ path: fileName, fullPage: true });
    console.log(`check the screenshot in ${fileName}`);
    // Closes the browser and all of its pages
    await browser.close();
}
//# sourceMappingURL=bot-was-not-detected-using-stealth.js.map