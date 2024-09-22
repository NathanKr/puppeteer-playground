import puppeteer from 'puppeteer';
import path from 'path';
import { getOutputDirPath, pauseMs, deleteDirectoryContents } from '../utils';

const URL = 'https://react.dev/blog/2024/02/15/react-labs-what-we-have-been-working-on-february-2024';

export async function run(): Promise<void> {
    deleteDirectoryContents(getOutputDirPath());

    const browser = await puppeteer.launch({ headless: true });
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

        await pauseMs(1000); // --- wait for scroll brute force

        const imagePath = path.join(
            getOutputDirPath(),
            `image_section_${iSectionIndex + 1}.png`
        );

        await page.screenshot({
            path: imagePath,
            fullPage: false, // Only capture the current viewport
        });
        console.log(`screenshot ${imagePath}`);
    }

    await browser.close();
}
