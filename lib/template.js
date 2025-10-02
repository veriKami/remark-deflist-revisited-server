//: lib/template.js
//: --------------------------------------------------------
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cssPath = join(__dirname, "..", "styles", "main.css");

let cachedCSS;

//: --------------------------------------------------------
function getCSS() {
  if (!cachedCSS) {
    cachedCSS = readFileSync(cssPath, "utf-8");
  }
  return cachedCSS;
}

//: --------------------------------------------------------
export function createHTMLPage(content, title = "Markdown Processor") {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>${getCSS()}</style>
  </head>
<body>
  <div class="container">
    ${content}
    <hr>
    <p style="text-align: center; color: #6b7280; font-size: 0.9em;">
      Powered by @verikami/remark-deflist-revisited
    </p>
  </div>
</body>
</html>`;
}
