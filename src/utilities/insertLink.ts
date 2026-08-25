import { saveEditorSnapshot } from "./saveEditorSnapshot";

export function insertLink(
  url: string,
  savedRange: Range,
  onUpdate: (content: string) => void,
) {
  const container = savedRange.commonAncestorContainer;
  const containerElement =
    container.nodeType === Node.ELEMENT_NODE
      ? (container as Element)
      : container.parentElement;
  const editableElement = containerElement?.closest<HTMLElement>(
    "[contenteditable='true']",
  );

  if (!editableElement) {
    return;
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    alert("Please enter a valid URL.");
    return;
  }

  if (!["http:", "https:", "mailto:"].includes(parsedUrl.protocol)) {
    alert("This URL type is not allowed.");
    return;
  }

  saveEditorSnapshot();

  const link = document.createElement("a");

  link.href = parsedUrl.toString();
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = "editorLink";
  link.contentEditable = "false";

  const selectedContent = savedRange.extractContents();

  link.appendChild(selectedContent);
  savedRange.insertNode(link);

  onUpdate(editableElement.innerHTML);
}
