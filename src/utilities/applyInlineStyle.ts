import { getSelection, setCaret } from "./caret";
import { saveEditorSnapshot } from "./saveEditorSnapshot";

/*
 * Normalizes a color value to RGB format for consistent comparison.
 * Handles hex, rgb, rgba, and named colors.
 */
function normalizeColor(color: string): string {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return color.toLowerCase();

  ctx.fillStyle = color;
  return ctx.fillStyle; // Browser returns normalized RGB format
}

/*
 * Walks up from a node to find the nearest ancestor <span>
 * that has this exact inline style property set to this
 * exact value (e.g. property "color", value "#ff0000").
 */
function findEnclosingStyledSpan(
  node: Node | null,
  property: string,
  value: string,
): HTMLElement | null {
  let element =
    node?.nodeType === Node.TEXT_NODE
      ? (node as Text).parentElement
      : (node as HTMLElement | null);

  const normalizedValue = normalizeColor(value);

  while (element) {
    if (
      element.tagName === "SPAN" &&
      normalizeColor(element.style.getPropertyValue(property)) ===
        normalizedValue
    ) {
      return element;
    }
    element = element.parentElement;
  }

  return null;
}

/*
 * Finds a single span (matching property+value) that owns
 * every meaningful (non-whitespace) text node in the range.
 * Mirrors the same whitespace-skipping logic formatSelection
 * uses, for the same reason: avoids false negatives from a
 * trailing caret-anchor span grabbed by double-click selection.
 */
function getSharedStyledSpan(
  range: Range,
  editableElement: HTMLElement,
  property: string,
  value: string,
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
    if (!text.trim()) continue;

    sawMeaningfulNode = true;

    const span = findEnclosingStyledSpan(node, property, value);
    if (!span) return null;

    if (sharedSpan === null) {
      sharedSpan = span;
    } else if (sharedSpan !== span) {
      return null;
    }
  }

  return sawMeaningfulNode ? sharedSpan : null;
}

/*
 * Finds any span that owns all meaningful text nodes in the range
 * and has any value for the given property (for removing old styles).
 */
function getSharedStyledSpanAny(
  range: Range,
  editableElement: HTMLElement,
  property: string,
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
    if (!text.trim()) continue;

    sawMeaningfulNode = true;

    let element =
      node.nodeType === Node.TEXT_NODE
        ? (node as Text).parentElement
        : (node as HTMLElement | null);

    let span: HTMLElement | null = null;
    while (element) {
      if (
        element.tagName === "SPAN" &&
        element.style.getPropertyValue(property)
      ) {
        span = element;
        break;
      }
      element = element.parentElement;
    }

    if (!span) return null;

    if (sharedSpan === null) {
      sharedSpan = span;
    } else if (sharedSpan !== span) {
      return null;
    }
  }

  return sawMeaningfulNode ? sharedSpan : null;
}

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

/*
 * Applies (or, if the selection is already entirely that
 * exact value, removes) an inline CSS style on the current
 * selection, via a wrapping <span>.
 *
 * property: e.g. "color", "background-color"
 * value:    e.g. "#ff0000"
 */
function applyInlineStyle(
  property: string,
  value: string,
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

  const sharedSpan = getSharedStyledSpan(
    range,
    editableElement,
    property,
    value,
  );

  // If all selected text is already in a span with the same value, remove it (toggle off)
  if (sharedSpan) {
    saveEditorSnapshot();
    unwrapSpan(sharedSpan, editableElement);
    onUpdate?.(editableElement.innerHTML);
    return;
  }

  // Check if there's an existing span with a different value for this property
  const existingSpan = getSharedStyledSpanAny(range, editableElement, property);

  saveEditorSnapshot();

  // If there's an existing span with a different value, remove it first
  if (existingSpan) {
    unwrapSpan(existingSpan, editableElement);
  }

  const span = document.createElement("span");
  span.style.setProperty(property, value);

  try {
    range.surroundContents(span);
  } catch {
    const fragment = range.extractContents();
    span.appendChild(fragment);
    range.insertNode(span);
  }

  const anchor = document.createElement("span");
  anchor.dataset.caretAnchor = "true";
  anchor.style.color = "";

  const anchorText = document.createTextNode("\u00A0");
  anchor.appendChild(anchorText);

  span.after(anchor);
  setCaret(anchorText, anchorText.length);

  onUpdate?.(editableElement.innerHTML);
}

export default applyInlineStyle;
