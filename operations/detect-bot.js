const puppeteer = require('puppeteer'); 
 
async function run ()  { 
	// Initiate the browser 
	const browser = await puppeteer.launch(); 
 
	// Create a new page with the default browser context 
	const page = await browser.newPage(); 
 
	// Setting page view 
	await page.setViewport({ width: 1280, height: 720 }); 
 
	// Go to the target website 
	await page.goto('https://nowsecure.nl/'); 
 
	// Wait for security check 
	//  await page.waitForTimeout(10000); 
    await new Promise(r => setTimeout(r, 10000));
 
    const fileName = 'image.png';
	// Take screenshot 
	await page.screenshot({ path: fileName, fullPage: true }); 

    console.log(`check the screen shot in ${fileName}`);
 
	// Closes the browser and all of its pages 
	await browser.close(); 
}

module.exports = { run };
