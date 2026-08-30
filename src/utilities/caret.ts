export function setCaret(node: Node, offset: number): void {
  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();

  range.setStart(node, offset);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
}

export function getSelection() {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  return selection;
}

export function focusElementEnd(element: HTMLElement): void {
  element.focus();

  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);

  selection.removeAllRanges();
  selection.addRange(range);
}
