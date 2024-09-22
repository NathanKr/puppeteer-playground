"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const URL = 'https://react.dev/blog/2024/02/15/react-labs-what-we-have-been-working-on-february-2024';
async function run() {
    (0, utils_1.deleteDirectoryContents)((0, utils_1.getOutputDirPath)());
    const browser = await puppeteer_1.default.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(URL); // Replace with your target URL
    // Get the number of h2 elements
    const h2Count = await page.evaluate(() => {
        return document.querySelectorAll('h2').length;
    });
    for (let iSectionIndex = 0; iSectionIndex < h2Count; iSectionIndex++) {
        await page.evaluate((iSectionIndex) => {
            const h2Element = document.querySelectorAll('h2')[iSectionIndex];
            if (h2Element) {
                h2Element.scrollIntoView();
            }
        }, iSectionIndex);
        await (0, utils_1.pauseMs)(1000); // --- wait for scroll brute force
        const imagePath = path_1.default.join((0, utils_1.getOutputDirPath)(), `image_section_${iSectionIndex + 1}.png`);
        await page.screenshot({
            path: imagePath,
            fullPage: false, // Only capture the current viewport
        });
        console.log(`screenshot ${imagePath}`);
    }
    await browser.close();
}
//# sourceMappingURL=page-scroll-to-h2.js.map