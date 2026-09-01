import { getSelection } from "./caret";
import { saveEditorSnapshot } from "./saveEditorSnapshot";

/*
 * Applies a heading style to selected text within a block.
 * If text is selected, it wraps the selected content in a heading span.
 * If nothing is selected, it applies the heading to the entire block.
 *
 * property: "headingLevel" (we'll store this as a data attribute)
 * value: "h1", "h2", "h3", etc.
 */
function applyHeadingToSelection(
  property: string,
  value: string,
  onUpdate?: (content: string) => void,
) {
  const selection = getSelection();
  if (!selection || selection.isCollapsed) {
    // No selection, apply to entire block via the normal changeTag flow
    return;
  }

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

  saveEditorSnapshot();

  // Create a span with a heading class and data attribute
  const span = document.createElement("span");
  span.className = `heading-span heading-${value}`;
  span.dataset.headingLevel = value;

  try {
    range.surroundContents(span);
  } catch {
    // If surroundContents fails (e.g., for complex selections), extract and re-insert
    const fragment = range.extractContents();
    span.appendChild(fragment);
    range.insertNode(span);
  }

  onUpdate?.(editableElement.innerHTML);
}

export default applyHeadingToSelection;
