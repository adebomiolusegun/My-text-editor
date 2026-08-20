import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";
import { useEffect, useRef, type ElementType, type KeyboardEvent } from "react";

import type { Block } from "../../Types/types";
import { setCaret } from "@utilities/caret";

const headingStyles: Record<string, string> = {
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
  h4: "text-xl font-medium",
  h5: "text-lg font-medium",
  h6: "text-base font-medium",
  p: "text-[12px] font-normal",
};

const PLACEHOLDER_TEXT = "Start writing...";

function TextArea({ block }: { block: Block }) {
  const ref = useRef<HTMLElement | null>(null);

  const { setActiveBlock, updateContent, addBlockAfter } = useEditorStore();

  /*
   * Sync Zustand → DOM.
   *
   * Don't overwrite the DOM while the user is actively editing.
   * Doing so can destroy the caret/selection.
   */
  useEffect(() => {
    if (!ref.current) return;

    const isFocused = document.activeElement === ref.current;

    if (!isFocused) {
      ref.current.innerHTML = block.content || "";
    }
  }, [block.content]);

  if (!block) return null;

  /*
   * DOM → Zustand
   */
  function handleInput() {
    if (!ref.current) return;

    updateContent(block.id, ref.current.innerHTML);
  }

  /*
   * User enters the block.
   */
  function handleFocus() {
    setActiveBlock(block.id);

    if (block.content === PLACEHOLDER_TEXT && ref.current) {
      ref.current.innerHTML = "";

      updateContent(block.id, "");
    }
  }

  /*
   * User leaves the block.
   */
  function handleBlur() {
    if (!ref.current) return;

    const text = ref.current.innerText.trim();

    if (text === "") {
      ref.current.innerHTML = PLACEHOLDER_TEXT;

      updateContent(block.id, PLACEHOLDER_TEXT);
    }
  }

  /*
   * Keyboard behavior.
   */
  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    /*
     * ENTER
     *
     * Don't allow contentEditable to create its
     * own paragraph. Our editor creates a new block.
     */
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      addBlockAfter(block.id);

      return;
    }

    /*
     * SPACE
     *
     * Only intervene when the caret is currently
     * inside one of our formatting spans.
     */
    if (e.key !== " ") return;

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) {
      return;
    }

    const anchorNode = selection.anchorNode;

    if (!anchorNode) return;

    const element =
      anchorNode.nodeType === Node.TEXT_NODE
        ? anchorNode.parentElement
        : anchorNode instanceof HTMLElement
          ? anchorNode
          : null;

    const formattedSpan = element?.closest<HTMLElement>("span[class^='fmt-']");

    if (!formattedSpan) return;

    /*
     * The browser would normally insert the space
     * inside the formatted span.
     *
     * We don't want that.
     */
    e.preventDefault();

    /*
     * Use a NORMAL space here.
     *
     * NBSP is reserved for the temporary caret anchor
     * used by formatSelection().
     */
    const space = document.createTextNode(" ");

    formattedSpan.after(space);

    /*
     * Put the caret immediately after the space.
     */
    setCaret(space, space.length);

    /*
     * We manually changed the DOM, so synchronize
     * it with Zustand.
     */
    if (ref.current) {
      updateContent(block.id, ref.current.innerHTML);
    }
  }

  const Tag = block.tag as ElementType;

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      contentEditable
      onFocus={handleFocus}
      onBlur={handleBlur}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning
      className={`${headingStyles[block.tag]} blockStyle`}
    />
  );
}

export default TextArea;
