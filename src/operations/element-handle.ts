import puppeteer from 'puppeteer';

export async function run(): Promise<void> {
    const url = "http://www.example.com";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const val = await page.$eval("body > div > h1", (elem: Element) => elem.innerHTML);
    console.log(`${url}  -> value of first h1 : ${val}`);
    await browser.close();
}