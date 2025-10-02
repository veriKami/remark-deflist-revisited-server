//: lib/processor.js
//: --------------------------------------------------------
import { remark } from "remark";
import html from "remark-html";
import deflist from "@verikami/remark-deflist-revisited";

//: --------------------------------------------------------
export async function processMarkdown(markdown) {
  const result = await remark()
    .use(deflist)
    .use(html)
    .process(markdown);

  return String(result);
}
