const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const URL =
    "https://react.dev/blog/2024/02/15/react-labs-what-we-have-been-working-on-february-2024";
  await page.goto(URL);

  const sections = await page.evaluate(() => {
    const sections = [];
    const h2Elements = document.querySelectorAll("h2");

    h2Elements.forEach((h2, index) => {
      const section = { heading: h2.innerText, content: "" };
      let nextSibling = h2.nextElementSibling;

      while (nextSibling && nextSibling.tagName !== "H2") {
        section.content += nextSibling.outerHTML;
        nextSibling = nextSibling.nextElementSibling;
      }

      sections.push(section);
    });

    return sections;
  });

  console.log(sections);

  await browser.close();
}

module.exports = { run };
