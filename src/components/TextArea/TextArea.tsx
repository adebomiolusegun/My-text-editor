import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";

import { useEffect, useRef, type ElementType, type KeyboardEvent } from "react";

import type { Block } from "../../Types/types";

import { saveEditorSnapshot } from "@utilities/saveEditorSnapshot";

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

  useEffect(() => {
    if (!ref.current) return;

    const isFocused = document.activeElement === ref.current;

    if (!isFocused) {
      ref.current.innerHTML = block.content || "";
    }
  }, [block.content]);

  if (!block) return null;

  function handleInput() {
    if (!ref.current) return;

    updateContent(block.id, ref.current.innerHTML);
  }

  function handleFocus() {
    setActiveBlock(block.id);

    if (block.content === PLACEHOLDER_TEXT && ref.current) {
      ref.current.innerHTML = "";

      updateContent(block.id, "");
    }
  }

  function handleBlur() {
    if (!ref.current) return;

    const text = ref.current.innerText.trim();

    if (text === "") {
      updateContent(block.id, PLACEHOLDER_TEXT);

      ref.current.innerHTML = PLACEHOLDER_TEXT;
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    /*
     * ENTER
     */
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      /*
       * Save the document BEFORE
       * creating the new block.
       */
      saveEditorSnapshot();

      /*
       * Create the new block.
       */
      addBlockAfter(block.id);

      return;
    }

    /*
     * SPACE
     */
    if (e.key !== " ") {
      return;
    }

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

    if (!formattedSpan) {
      return;
    }

    e.preventDefault();

    /*
     * Save BEFORE modifying DOM.
     */
    saveEditorSnapshot();

    const space = document.createTextNode(" ");

    formattedSpan.after(space);

    setCaret(space, space.length);

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
