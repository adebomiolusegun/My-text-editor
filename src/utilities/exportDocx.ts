import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  LevelFormat,
} from "docx";
import type { Block } from "@Types/types";
import { downloadFile } from "./downloadFile";
import { parseContentToDocxChildren } from "./docxRunsFromContent";

const headingMap: Record<
  string,
  (typeof HeadingLevel)[keyof typeof HeadingLevel]
> = {
  h1: HeadingLevel.HEADING_1,
  h2: HeadingLevel.HEADING_2,
  h3: HeadingLevel.HEADING_3,
  h4: HeadingLevel.HEADING_4,
  h5: HeadingLevel.HEADING_5,
  h6: HeadingLevel.HEADING_6,
};

const alignmentMap: Record<
  string,
  (typeof AlignmentType)[keyof typeof AlignmentType]
> = {
  left: AlignmentType.LEFT,
  center: AlignmentType.CENTER,
  right: AlignmentType.RIGHT,
  justify: AlignmentType.JUSTIFIED,
};

function blockToParagraph(block: Block): Paragraph {
  const children = parseContentToDocxChildren(block.content || "");
  const alignment = block.alignment ? alignmentMap[block.alignment] : undefined;

  if (block.listType === "list-ol") {
    return new Paragraph({
      children,
      alignment,
      numbering: { reference: "editor-ordered-list", level: 0 },
    });
  }

  if (block.listType === "list-ul" || block.listType === "list-circle") {
    return new Paragraph({
      children,
      alignment,
      numbering: { reference: "editor-unordered-list", level: 0 },
    });
  }

  return new Paragraph({
    children,
    alignment,
    heading: headingMap[block.tag] ?? undefined,
  });
}

export async function exportAsDocx(blocks: Block[], title = "document") {
  const doc = new Document({
    numbering: {
      config: [
        {
          reference: "editor-ordered-list",
          levels: [
            {
              level: 0,
              format: LevelFormat.DECIMAL,
              text: "%1.",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } },
            },
          ],
        },
        {
          reference: "editor-unordered-list",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "\u2022",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 720, hanging: 360 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        children: blocks.map(blockToParagraph),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  downloadFile(
    blob,
    `${title}.docx`,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  );
}
