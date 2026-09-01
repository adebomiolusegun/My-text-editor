import type { Block } from "@Types/types";

import { downloadFile } from "./downloadFile";
import { groupBlocks } from "./blockGroup";

const alignmentStyle: Record<string, string> = {
  left: "text-align:left;",
  center: "text-align:center;",
  right: "text-align:right;",
  justify: "text-align:justify;",
};

function renderBlock(block: Block): string {
  const align = block.alignment ? (alignmentStyle[block.alignment] ?? "") : "";
  const content = block.content || "";

  if (block.listType) {
    return `<li style="${align}">${content}</li>`;
  }

  const Tag = block.tag || "p";
  return `<${Tag} style="${align}">${content}</${Tag}>`;
}

export function buildHtmlBody(blocks: Block[]): string {
  const groups = groupBlocks(blocks);

  return groups
    .map((group) => {
      if (!group.listType) {
        return group.items.map(renderBlock).join("\n");
      }

      const ListTag = group.listType === "list-ol" ? "ol" : "ul";
      const items = group.items.map(renderBlock).join("\n");

      return `<${ListTag}>\n${items}\n</${ListTag}>`;
    })
    .join("\n");
}

export function exportAsHtml(blocks: Block[], title = "document") {
  const body = buildHtmlBody(blocks);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; line-height: 1.6; }
  h1,h2,h3,h4,h5,h6 { font-weight: 600; }
  .fmt-bold { font-weight: 700; }
  .fmt-italic { font-style: italic; }
  .fmt-underline { text-decoration: underline; }
  .fmt-strike { text-decoration: line-through; }
</style>
</head>
<body>
${body}
</body>
</html>`;

  downloadFile(html, `${title}.html`, "text/html");
}
