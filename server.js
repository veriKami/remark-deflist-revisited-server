//: server.js
//: --------------------------------------------------------
import { createServer } from "http";
import { parse } from "url";
import { readFile } from "node:fs/promises";
import { processMarkdown } from "./lib/processor.js";
import { createHTMLPage } from "./lib/template.js";
import { generateFromFile } from "./lib/generator.js";

const PORT = process.env.PORT || 3000;

//: --------------------------------------------------------
async function renderFormPage(markdown, title) {
  const content = await processMarkdown(markdown);
  const formHTML = `
    <form method="POST" action="/process">
      <h2>Try it yourself</h2>
      <textarea name="markdown" placeholder="Enter your markdown with definition lists...">${markdown}</textarea>
      <button type="submit">Process Markdown</button>
    </form>
    <div class="output">
      ${content}
    </div>
  `;
  return createHTMLPage(formHTML, title);
}

//: --------------------------------------------------------
async function handleRequest(req, res) {
  const { pathname } = parse(req.url, true);

  try {
    if (pathname === "/" && req.method === "GET") {
      const markdown = await readFile("examples/basic.md", "utf-8");
      const page = await renderFormPage(markdown, "Markdown Processor - Live Demo");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(page);
    }
    else if (pathname === "/process" && req.method === "POST") {
      let body = "";
      req.on("data", chunk => { body += chunk.toString(); });
      req.on("end", async () => {
        const markdown = decodeURIComponent(body.split("=")[1] || "").replace(/\+/g, " ");
        const page = await renderFormPage(markdown, "Markdown Processor - Result");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(page);
      });
    }
    else if (pathname === "/generate" && req.method === "GET") {
      await generateFromFile("examples/basic.md", "output.html", "Generated Document");
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("✅ output.html generated successfully");
    }
    else {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
    }
  }
  catch (err) {
    console.error("❌ Error:", err.message);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
  }
}

//: --------------------------------------------------------
//: SERVER

const server = createServer(handleRequest);

server.listen(PORT, () => {
  console.log("👄 Processing Markdown");
  console.log(`🌐 http://localhost:${PORT}\n`);
});
