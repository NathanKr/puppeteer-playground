"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const puppeteer_1 = __importDefault(require("puppeteer"));
const utils_1 = require("../utils");
const path_1 = __importDefault(require("path"));
async function run() {
    const browser = await puppeteer_1.default.launch({ headless: true });
    const page = await browser.newPage();
    // Set your HTML content directly
    const htmlContent = `
    <html>
    <head>
      <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/vs.min.css"
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
    ></script>
    <script>hljs.highlightAll();</script>
    </body>
    </html>
  `;
    await page.setContent(htmlContent);
    const fileName = `highlighted_page_${(0, utils_1.timeStamp)()}.png`;
    const filePath = path_1.default.resolve((0, utils_1.getOutputDirPath)(), fileName);
    try {
        await page.screenshot({ path: filePath, fullPage: true });
        console.log(`Image created: ${filePath}`);
    }
    catch (error) {
        console.error("Error creating image:", error);
    }
    await browser.close();
}
//# sourceMappingURL=page-with-code-highlight.js.map