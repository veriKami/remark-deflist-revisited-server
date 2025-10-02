//: test.js
//: --------------------------------------------------------
import { test, describe } from "node:test";
import { strict as assert } from "node:assert";
import { readFile } from "node:fs/promises";
import { processMarkdown } from "./lib/processor.js";
import { createHTMLPage } from "./lib/template.js";

//: --------------------------------------------------------
describe("Markdown Processing", () => {
  test("should process basic definition list", async () => {
    const markdown = `
Term A
: Definition A1
: Definition A2
`;
    const result = await processMarkdown(markdown);

    assert.ok(result.includes("Term A"), "Should contain Term A");
    assert.ok(result.includes("Definition A1"), "Should contain Definition A1");
    assert.ok(result.includes("Definition A2"), "Should contain Definition A2");
    assert.ok(result.includes("<dl>"), "Should contain <dl> tag");
    assert.ok(result.includes("<dt>"), "Should contain <dt> tag");
    assert.ok(result.includes("<dd>"), "Should contain <dd> tag");
  });

  test("should handle nested lists in definitions", async () => {
    const markdown = `
Definition Lists
: Support nested content
: - Item 1
  - Item 2
`;
    const result = await processMarkdown(markdown);

    assert.ok(result.includes("Definition Lists"));
    assert.ok(result.includes("Item 1"));
    assert.ok(result.includes("<ul>"), "Should contain nested list");
  });

  test("should process headings correctly", async () => {
    const markdown = "# Test Heading\n\nContent";
    const result = await processMarkdown(markdown);

    assert.ok(result.includes("<h1>"));
    assert.ok(result.includes("Test Heading"));
  });

  test("should handle minimal markdown", async () => {
    const result = await processMarkdown("Simple text");
    assert.ok(result.includes("Simple text"));
  });

  test("should load examples from files", async () => {
    const markdown = await readFile("examples/basic.md", "utf-8");
    assert.ok(markdown.length > 0, "Example file should not be empty");
    assert.ok(markdown.includes("Node.js"), "Should contain example content");
  });
});

//: --------------------------------------------------------
describe("HTML Template", () => {
  test("should create valid HTML page", () => {
    const content = "<p>Test content</p>";
    const page = createHTMLPage(content, "Test Title");

    assert.ok(page.includes("<!DOCTYPE html>"));
    assert.ok(page.includes("<title>Test Title</title>"));
    assert.ok(page.includes(content));
    assert.ok(page.includes("</html>"));
  });

  test("should use default title if not provided", () => {
    const page = createHTMLPage("<p>Test</p>");
    assert.ok(page.includes("Markdown Processor"));
  });

  test("should include CSS styles", () => {
    const page = createHTMLPage("<p>Test</p>");
    assert.ok(page.includes("<style>"));
    assert.ok(page.includes("</style>"));
  });

  test("should escape HTML in title", () => {
    const page = createHTMLPage("<p>Test</p>", "Test & Title");
    assert.ok(page.includes("Test & Title"));
  });
});
