<<<<<<< HEAD
import { useRedoUndoStore } from "@store/RedoUndoStore";

function TextArea() {
  const { current, setCurrent } = useRedoUndoStore();
=======
import { useEditorStore } from "@store/TextEditorStore";
import { useEffect, useRef, type KeyboardEvent } from "react";
import type { Block } from "../types";

function TextArea({ block }: { block: Block }) {
  const ref = useRef<HTMLElement | null>(null);
>>>>>>> text-editing

  const { setActiveBlock, updateContent, addBlockAfter } = useEditorStore();

<<<<<<< HEAD
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;

    if (value.length <= maxLength) {
      setCurrent(value);
=======
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
>>>>>>> text-editing
    }
  }

  const Tag = block.tag;

  return (
<<<<<<< HEAD
    <>
      <div className="flex flex-col justify-center items-center">
        <textarea
          value={current}
          onChange={handleChange}
          name=""
          id="message"
          contentEditable
          suppressContentEditableWarning
          placeholder="Write your text here..."
          className="textAreaStyle"
        ></textarea>
      </div>
    </>
=======
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
>>>>>>> text-editing
  );
}

export default TextArea;
