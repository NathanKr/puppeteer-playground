import puppeteer from 'puppeteer';

export async function run(): Promise<void> {
    // Initiate the browser
    const browser = await puppeteer.launch({ headless: false });

    // Create a new page with the default browser context
    const page = await browser.newPage();

    // Add Headers
    await page.setExtraHTTPHeaders({
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'upgrade-insecure-requests': '1',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    });

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
