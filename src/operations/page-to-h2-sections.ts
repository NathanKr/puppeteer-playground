import puppeteer from "puppeteer";

const URL = "https://react.dev/blog/2024/02/15/react-labs-what-we-have-been-working-on-february-2024";
// const URL = "https://nathankrasney.com/posts/load-image-faster-with-webp";

export async function run() {
  const browser = await puppeteer.launch({ headless: true }); // Use true, false, or "shell"
  const page = await browser.newPage();
  await page.goto(URL);

  const sections = await page.evaluate(() => {
    const sections: { heading: string; content: string }[] = [];
    const h2Elements = document.querySelectorAll("h2");

    h2Elements.forEach((h2) => {
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
