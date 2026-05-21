import { useEditorStore } from "@store/TextEditorStore";
import { useEffect, useRef, type KeyboardEvent } from "react";
import type { Block } from "../types";

function TextArea({ block }: { block: Block }) {
  const ref = useRef<HTMLElement | null>(null);

  const { setActiveBlock, updateContent, addBlockAfter } = useEditorStore();

  useEffect(() => {
    if (!block) return;

    if (ref.current && ref.current.innerHTML !== block.content) {
      ref.current.innerHTML = block.content;
    }
  }, [block.content]);

  if (!block) return null;

  function handleInput() {
    if (!ref.current) return;

    updateContent(block.id, ref.current.innerHTML);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();

      addBlockAfter(block.id);
    }
  }

  const Tag = block.tag;

  return (
    <Tag
      ref={(node) => {
        ref.current = node;
      }}
      contentEditable
      onFocus={() => setActiveBlock(block.id)}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning
      className="blockStyle"
    />
  );
}

export default TextArea;
