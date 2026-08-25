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

const alignmentStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const PLACEHOLDER_TEXT = "Start writing...";

function TextArea({ block }: { block: Block }) {
  const ref = useRef<HTMLElement | null>(null);

  /*
   * True when the change came from this
   * contentEditable itself.
   *
   * This prevents our useEffect from
   * replacing innerHTML while typing.
   */
  const isLocalChangeRef = useRef(false);

  const { setActiveBlock, updateContent, addBlockAfter } = useEditorStore();

  /*
   * Synchronize Zustand -> DOM.
   *
   * This is needed for Undo / Redo.
   *
   * But we MUST NOT do it when the change
   * came from the user typing.
   */
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isLocalChangeRef.current) {
      isLocalChangeRef.current = false;
      return;
    }

    /*
     * This happens for Undo / Redo.
     *
     * Update the DOM with the restored content.
     */
    if (ref.current.innerHTML !== (block.content || "")) {
      ref.current.innerHTML = block.content || "";
    }
  }, [block.content]);

  if (!block) {
    return null;
  }

  /*
   * INPUT
   */
  function handleInput() {
    if (!ref.current) {
      return;
    }

    /* Save the state before each input event for character-level undo. */
    saveEditorSnapshot();

    /*
     * Tell the effect that this update
     * originated from the contentEditable.
     */
    isLocalChangeRef.current = true;

    updateContent(block.id, ref.current.innerHTML);
  }

  /*
   * FOCUS
   */
  function handleFocus() {
    setActiveBlock(block.id);

    /*
     * Remove placeholder text.
     */
    if (block.content === PLACEHOLDER_TEXT && ref.current) {
      saveEditorSnapshot();

      ref.current.innerHTML = "";

      isLocalChangeRef.current = true;

      updateContent(block.id, "");
    }
  }

  /*
   * BLUR
   */
  function handleBlur() {
    if (!ref.current) {
      return;
    }

    const text = ref.current.innerText.trim();

    if (text === "") {
      if (block.content !== PLACEHOLDER_TEXT) {
        saveEditorSnapshot();
      }

      isLocalChangeRef.current = true;

      updateContent(block.id, PLACEHOLDER_TEXT);

      ref.current.innerHTML = PLACEHOLDER_TEXT;
    }
  }

  /*
   * KEYBOARD
   */
  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    /*
     * ENTER
     */
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      /*
       * Save BEFORE creating the new block.
       */
      saveEditorSnapshot();

      addBlockAfter(block.id);

      return;
    }

    /*
     * BACKSPACE / DELETE
     */
    if (e.key === "Backspace" || e.key === "Delete") {
      /* Save the state before each deletion for character-level undo. */
      saveEditorSnapshot();

      return;
    }

    /*
     * SPACE AFTER FORMATTED SPAN
     */
    if (e.key !== " ") {
      return;
    }

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) {
      return;
    }

    const anchorNode = selection.anchorNode;

    if (!anchorNode) {
      return;
    }

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
     * Save before changing the DOM.
     */
    saveEditorSnapshot();

    const space = document.createTextNode(" ");

    formattedSpan.after(space);

    /*
     * Put caret after the inserted space.
     */
    setCaret(space, space.length);

    if (ref.current) {
      isLocalChangeRef.current = true;

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
      suppressContentEditableWarning
      onFocus={handleFocus}
      onBlur={handleBlur}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      // className={`${headingStyles[block.tag]} blockStyle`}
      className={`
  blockStyle
  ${headingStyles[block.tag]}
  ${block.alignment ? alignmentStyles[block.alignment] : ""}
`}
    />
  );
}

export default TextArea;
