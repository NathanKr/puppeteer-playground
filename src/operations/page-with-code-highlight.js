const puppeteer = require("puppeteer");

async function run() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Set your HTML content directly
  const htmlContent = `
    <html>
    <head>
      <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/vs.min.css"
      integrity="sha512-AVoZ71dJLtHRlsgWwujPT1hk2zxtFWsPlpTPCc/1g0WgpbmlzkqlDFduAvnOV4JJWKUquPc1ZyMc5eq4fRnKOQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    </head>
    <body>
      <pre><code class="language-html">
          &lt;h1&gt;Hello&lt;/h1&gt;
      </code></pre>
      <pre><code class="language-javascript">
        function sum(num1,num2){
          const s = num1+num2; 
          return s;
        }
      </code></pre>
      <pre>
<code class='language-typescript'>
  export function sample1() {
    const posts = [
      {
        name: "Why Should You Use Core Web Vitals in Your WebSite",
        category: "performance",
      },
      { name: "Object.groupBy", category: "javascript" },
      {
        name: "How to Automate Page Speed Insight Score",
        category: "performance",
      },
    ];
    /*
    --- group by category : javascript , performance
    --- groups keys are categories and value are the original object
    */
    const groups = Object.groupBy(posts, ({ category }) => category);
    console.log(groups);
    console.log(Object.keys(groups));
    console.log(Object.values(groups));
  }
</code>
</pre>
<script
      src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js"
      integrity="sha512-BNc7saQYlxCL10lykUYhFBcnzdKMnjx5fp5s5wPucDyZ7rKNwCoqJh1GwEAIhuePEK4WM9askJBRsu7ma0Rzvg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <script>hljs.highlightAll();</script>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);

  const fileNmae = "highlighted_page.pdf";
  // Generate the PDF
  await page.pdf({
    path: fileNmae,
    format: "A4",
    printBackground: true,
  });

  console.log(`pdf with code highlight is created : ${fileNmae}`);

  await browser.close();
}

module.exports = { run };
