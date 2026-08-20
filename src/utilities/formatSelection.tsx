import { getSelection, setCaret } from "./caret";

function formatSelection(
  className: string,
  onUpdate?: (content: string) => void,
) {
  const selection = getSelection();

  if (!selection || selection.isCollapsed) return;

  const range = selection.getRangeAt(0);

  const selectedText = selection.toString();

  if (!selectedText.trim()) return;

  const selectedContainer =
    range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? (range.commonAncestorContainer as HTMLElement)
      : range.commonAncestorContainer.parentElement;

  const editableElement = selectedContainer?.closest<HTMLElement>(
    "[contenteditable='true']",
  );

  if (!editableElement) return;

  const span = document.createElement("span");

  span.className = className;

  try {
    range.surroundContents(span);
  } catch {
    const fragment = range.extractContents();

    span.appendChild(fragment);
    range.insertNode(span);
  }

  // Temporary, unformatted caret anchor.
  const anchor = document.createElement("span");

  anchor.dataset.caretAnchor = "true";

  anchor.style.fontWeight = "normal";
  anchor.style.fontStyle = "normal";
  anchor.style.textDecoration = "none";

  const anchorText = document.createTextNode("\u00A0");

  anchor.appendChild(anchorText);
  span.after(anchor);

  // Place caret after the NBSP.
  setCaret(anchorText, anchorText.length);

  anchor.remove();

  onUpdate?.(editableElement.innerHTML);
}

export default formatSelection;
