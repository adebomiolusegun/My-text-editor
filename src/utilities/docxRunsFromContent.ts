import { TextRun, ExternalHyperlink } from "docx";

function textRunFromNode(
  node: ChildNode,
  flags: {
    bold: boolean;
    italics: boolean;
    underline: boolean;
    strike: boolean;
  },
): TextRun {
  return new TextRun({
    text: node.textContent || "",
    bold: flags.bold,
    italics: flags.italics,
    underline: flags.underline ? {} : undefined,
    strike: flags.strike,
  });
}

export function parseContentToDocxChildren(
  html: string,
): (TextRun | ExternalHyperlink)[] {
  const container = document.createElement("div");
  container.innerHTML = html;

  const results: (TextRun | ExternalHyperlink)[] = [];

  function walk(
    node: ChildNode,
    flags: {
      bold: boolean;
      italics: boolean;
      underline: boolean;
      strike: boolean;
    },
  ) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent) {
        results.push(textRunFromNode(node, flags));
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const element = node as HTMLElement;
    const nextFlags = { ...flags };

    if (element.classList.contains("fmt-bold")) nextFlags.bold = true;
    if (element.classList.contains("fmt-italic")) nextFlags.italics = true;
    if (element.classList.contains("fmt-underline")) nextFlags.underline = true;
    if (element.classList.contains("fmt-strike")) nextFlags.strike = true;

    if (element.tagName === "A" && element.classList.contains("editorLink")) {
      const linkChildren: TextRun[] = [];
      element.childNodes.forEach((child) => {
        if (child.textContent) {
          linkChildren.push(
            new TextRun({
              text: child.textContent,
              ...nextFlags,
              underline: {},
            }),
          );
        }
      });

      results.push(
        new ExternalHyperlink({
          link: (element as HTMLAnchorElement).href,
          children: linkChildren,
        }),
      );
      return;
    }

    element.childNodes.forEach((child) => walk(child, nextFlags));
  }

  container.childNodes.forEach((child) =>
    walk(child, {
      bold: false,
      italics: false,
      underline: false,
      strike: false,
    }),
  );

  return results.length > 0 ? results : [new TextRun("")];
}
