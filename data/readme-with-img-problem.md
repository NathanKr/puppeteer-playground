  <h1>Experiment with marked.js</h1>

  <h2>Motivation</h2>
  <p>This project demonstrates how to use <code>marked.js</code> to convert Markdown into HTML. It's a quick and efficient solution for rendering Markdown in web projects.</p>

  <h2>Installation</h2>
  <p>To install <code>marked.js</code> locally, run the following command in your project:</p>

```bash
npm install marked
```

  <p>You can also use it via a CDN:</p>

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js">
```

  <h2>Usage</h2>
  <p>After setting up, open <code>index.html</code> in your browser. You should see a result similar to this:</p>
  
  <img src="https://raw.githubusercontent.com/NathanKr/marked-playground/main/figs/screenshot.png" alt="Screenshot of rendered Markdown">
  
  <h2>What is marked.js?</h2>
  <ul>
    <li><strong>marked.js</strong> is a fast, low-level Markdown parser and compiler that converts Markdown to HTML.</li>
    <li>It supports all standard Markdown features and can be used in browsers, servers, and CLI environments.</li>
  </ul>

  <h2>Why marked.js?</h2>
  <p>Built for speed and efficiency, marked.js parses Markdown without caching or blocking. It ensures high-performance rendering in any environment.</p>

  <h2>How I Use Markdown</h2>
  <ul>
    <li>I convert Markdown files to HTML for posts on my <a href='https://nathankrasney.com/blog'>personal website</a></li>
    <li>I use it in my <strong>post2youtube</strong> project to convert <code>README.md</code> files to HTML.</li>
  </ul>

  <h2>Key Markdown Features Supported by marked.js</h2>
  <ul>
    <li>Headings: <code>#</code>, <code>##</code>, <code>###</code>, etc.</li>
    <li>Paragraphs: Standard text blocks.</li>
    <li>Emphasis: <em>italic</em>, <strong>bold</strong>, <del>strikethrough</del>.</li>
    <li>Lists: Ordered (<code>1. Item</code>) and unordered (<code>- Item</code>).</li>
    <li>Links: <code>[Link](url)</code>.</li>
    <li>Images: <code>![alt text](url)</code>.</li>
    <li>Blockquotes: <code>&gt; Blockquote</code>.</li>
    <li>Code Blocks: Indented or fenced with backticks (<code>```</code>).</li>
    <li>Inline Code: <code>`inline code`</code>.</li>
    <li>Tables: Using pipes (<code>|</code>) and dashes (<code>-</code>).</li>
    <li>Horizontal Rules: <code>---</code>, <code>***</code>, <code>___</code>.</li>
    <li>HTML: Inline HTML elements can also be included.</li>
    <li>Escaping: Backslashes (<code>\</code>) can escape Markdown syntax.</li>
  </ul>

  <p>You can also include raw HTML elements in Markdown files. This can be useful for adding custom styles, scripts, or any other HTML features that are not native to Markdown syntax.</p>



  <h2>Code Example</h2>
<p>Here’s a simple example using <code>marked.js</code> to convert Markdown content to HTML. The <code>marked.parse</code> function takes Markdown content and converts it to HTML, as shown below </p>

```javascript
// Parse the Markdown content to HTML
const htmlContent = marked.parse(markdown);

// Insert the HTML content into the div with id "content"
document.getElementById("content").innerHTML = htmlContent;
```

  <p>Notice that the parser inserts HTML elements instead of Markdown directives, and specifically, it adds a <code>class="language-ts"</code> to the code block at the end</p>
  <img src="https://raw.githubusercontent.com/NathanKr/marked-playground/main/figs/resulted-html.png" alt="Resulted HTML">

