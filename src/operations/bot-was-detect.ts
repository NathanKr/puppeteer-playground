import puppeteer from 'puppeteer';

export async function run(): Promise<void> {
    // Initiate the browser
    const browser = await puppeteer.launch({ headless: false });

    // Create a new page with the default browser context
    const page = await browser.newPage();

    // Setting page view
    await page.setViewport({ width: 1280, height: 720 });

    // Go to the target website
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
