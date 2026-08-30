import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";

import {
  useEffect,
  useMemo,
  useRef,
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import type { Block } from "../../Types/types";

import { saveEditorSnapshot } from "@utilities/saveEditorSnapshot";
import { setCaret, focusElementEnd } from "@utilities/caret";

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

const PLACEHOLDER_TEXT = "";

function TextArea({ block }: { block: Block }) {
  const ref = useRef<HTMLElement | null>(null);

  const isLocalChangeRef = useRef(false);

  const {
    setActiveBlock,
    updateContent,
    addBlockAfter,
    // changeListType,
    pendingFocusId,
    clearPendingFocus,
  } = useEditorStore();

  const blocks = useEditorStore((state) => state.blocks);

  /*
   * Self-computed list number: counts how many
   * consecutive "list-ol" blocks precede (and include)
   * this one. Independent of any parent grouping logic,
   * so numbering works no matter how blocks are rendered.
   */
  const listItemNumber = useMemo(() => {
    if (block.listType !== "list-ol") return undefined;

    const index = blocks.findIndex((b) => b.id === block.id);
    if (index === -1) return 1;

    let count = 1;
    for (let i = index - 1; i >= 0; i--) {
      if (blocks[i].listType === "list-ol") {
        count++;
      } else {
        break;
      }
    }
    return count;
  }, [blocks, block.id, block.listType]);

  /*
   * Zustand -> DOM
   *
   * Mainly needed for undo / redo, and covers cases
   * where the DOM node type changes (p <-> li) but
   * content needs to stay in sync.
   */
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isLocalChangeRef.current) {
      isLocalChangeRef.current = false;
      return;
    }

    const content = block.content || "";

    if (ref.current.innerHTML !== content) {
      ref.current.innerHTML = content;
    }
  }, [block.content, block.listType, block.tag]);

  /*
   * Claim focus when this block is the pending-focus
   * target — i.e. it was just created, or its DOM node
   * was just swapped (list toggle / tag change).
   */
  useEffect(() => {
    if (pendingFocusId === block.id && ref.current) {
      focusElementEnd(ref.current);
      clearPendingFocus();
    }
  }, [pendingFocusId, block.id, clearPendingFocus]);

  /*
   * INPUT
   */
  function handleInput() {
    if (!ref.current) {
      return;
    }

    saveEditorSnapshot();

    isLocalChangeRef.current = true;

    updateContent(block.id, ref.current.innerHTML);
  }

  /*
   * FOCUS
   */
  function handleFocus() {
    setActiveBlock(block.id);

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
   * CLICK
   */
  function handleClick(e: MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;

    const link = target.closest<HTMLAnchorElement>("a.editorLink");

    if (!link) {
      return;
    }

    e.preventDefault();

    window.open(link.href, "_blank", "noopener,noreferrer");
  }

  /*
   * KEYBOARD
   */
  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    /*
     * ENTER
     */
    if (e.key === "Enter") {
      /*
       * SHIFT+ENTER — continue the list.
       * Inherits tag + listType, so numbering/bullets
       * carry on exactly like the current addBlockAfter
       * default behavior.
       */
      if (e.shiftKey) {
        if (block.listType) {
          e.preventDefault();
          saveEditorSnapshot();
          addBlockAfter(block.id);
        }
        /*
         * Not in a list: let Shift+Enter fall through to
         * the browser's native soft line break, unchanged.
         */
        return;
      }

      /*
       * PLAIN ENTER — always exit to a normal paragraph,
       * regardless of whether the current block is a list
       * item, heading, etc.
       */
      e.preventDefault();
      saveEditorSnapshot();
      addBlockAfter(block.id, { tag: "p", listType: undefined });
      return;
    }

    /*
     * BACKSPACE / DELETE
     */
    if (e.key === "Backspace" || e.key === "Delete") {
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

    saveEditorSnapshot();

    const space = document.createTextNode(" ");

    formattedSpan.after(space);

    setCaret(space, space.length);

    if (ref.current) {
      isLocalChangeRef.current = true;

      updateContent(block.id, ref.current.innerHTML);
    }
  }

  const isList = Boolean(block.listType);
  const Tag = isList ? "li" : (block.tag as ElementType);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;

        if (node && node.innerHTML !== (block.content || "")) {
          node.innerHTML = block.content || "";
        }
      }}
      contentEditable
      suppressContentEditableWarning
      data-list-index={
        block.listType === "list-ol" ? listItemNumber : undefined
      }
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      className={`
        blockStyle
        ${isList ? `listItemStyle ${block.listType}` : ""}
        ${isList ? headingStyles.p : headingStyles[block.tag]}
        ${block.alignment ? alignmentStyles[block.alignment] : ""}
      `}
    />
  );
}

export default TextArea;
