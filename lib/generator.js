//: lib/generator.js
//: --------------------------------------------------------
import { writeFile, readFile } from "node:fs/promises";
import { processMarkdown } from "./processor.js";
import { createHTMLPage } from "./template.js";

//: --------------------------------------------------------
export async function generateFromFile(inputPath, outputPath, title) {
  const markdown = await readFile(inputPath, "utf-8");
  const content = await processMarkdown(markdown);
  const page = createHTMLPage(content, title);
  await writeFile(outputPath, page);
  return page;
}

//: --------------------------------------------------------
export async function generateFromString(markdown, title) {
  const content = await processMarkdown(markdown);
  return createHTMLPage(content, title);
}
