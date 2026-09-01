import { getSelection, setCaret } from "./caret";
import { saveEditorSnapshot } from "./saveEditorSnapshot";

/*
 * Walks up from a node to find the nearest ancestor <span>
 * carrying this exact format class, if any.
 */
function findEnclosingFormatSpan(
  node: Node | null,
  className: string,
): HTMLElement | null {
  const element =
    node?.nodeType === Node.TEXT_NODE
      ? (node as Text).parentElement
      : (node as HTMLElement | null);

  return element?.closest<HTMLElement>(`span.${className}`) ?? null;
}

/*
 * Finds the single format span that fully "owns" every
 * meaningful (non-whitespace) text node touched by the
 * selection range.
 *
 * Skipping whitespace-only nodes is what makes this robust
 * against double-click selections that grab a trailing
 * space/nbsp from an adjacent caret-anchor span — without
 * this, that stray node would make the selection look like
 * it spans two different spans, and the toggle-off branch
 * would never fire.
 *
 * Returns null if the selection isn't cleanly and entirely
 * inside one such span (meaning: apply, don't remove).
 */
function getSharedFormatSpan(
  range: Range,
  editableElement: HTMLElement,
  className: string,
): HTMLElement | null {
  const walker = document.createTreeWalker(
    editableElement,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        return range.intersectsNode(node)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    },
  );

  let sharedSpan: HTMLElement | null = null;
  let sawMeaningfulNode = false;

  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent ?? "";

    if (!text.trim()) {
      continue;
    }

    sawMeaningfulNode = true;

    const span = findEnclosingFormatSpan(node, className);

    if (!span) {
      return null;
    }

    if (sharedSpan === null) {
      sharedSpan = span;
    } else if (sharedSpan !== span) {
      return null;
    }
  }

  return sawMeaningfulNode ? sharedSpan : null;
}

/*
 * Removes a format span, replacing it with its own children
 * so the text stays but the formatting doesn't. Caret is
 * placed at the end of what used to be the span's content.
 */
function unwrapSpan(span: HTMLElement, editableElement: HTMLElement) {
  const parent = span.parentNode;

  if (!parent) return;

  const fragment = document.createDocumentFragment();
  let lastChild: ChildNode | null = null;

  while (span.firstChild) {
    lastChild = span.firstChild;
    fragment.appendChild(span.firstChild);
  }

  parent.replaceChild(fragment, span);

  if (lastChild) {
    const offset =
      lastChild.nodeType === Node.TEXT_NODE
        ? (lastChild.textContent?.length ?? 0)
        : lastChild.childNodes.length;

    setCaret(lastChild, offset);
  }

  editableElement.normalize();
}

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

  /*
   * TOGGLE CHECK
   */
  const sharedSpan = getSharedFormatSpan(range, editableElement, className);

  if (sharedSpan) {
    saveEditorSnapshot();

    unwrapSpan(sharedSpan, editableElement);

    onUpdate?.(editableElement.innerHTML);

    return;
  }

  /*
   * Otherwise, apply the format as before.
   */
  saveEditorSnapshot();

  const span = document.createElement("span");

  span.className = className;

  try {
    range.surroundContents(span);
  } catch {
    const fragment = range.extractContents();

    span.appendChild(fragment);
    range.insertNode(span);
  }

  const anchor = document.createElement("span");

  anchor.dataset.caretAnchor = "true";

  anchor.style.fontWeight = "normal";
  anchor.style.fontStyle = "normal";
  anchor.style.textDecoration = "none";

  const anchorText = document.createTextNode("\u00A0");

  anchor.appendChild(anchorText);

  span.after(anchor);

  setCaret(anchorText, anchorText.length);

  onUpdate?.(editableElement.innerHTML);
}

export default formatSelection;
