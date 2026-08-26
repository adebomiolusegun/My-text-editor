import { CiImageOn } from "react-icons/ci";

import { useRef, type ChangeEvent } from "react";

import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";
import { insertImage } from "@utilities/insertImage";

function Image() {
  const savedRangeRef = useRef<Range | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const activeBlockId = useEditorStore((state) => state.activeBlockId);
  const updateContent = useEditorStore((state) => state.updateContent);

  function handleMouseDown(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
      savedRangeRef.current = null;
      return;
    }

    savedRangeRef.current = selection.getRangeAt(0).cloneRange();
  }

  function handleClick() {
    if (!activeBlockId || !savedRangeRef.current) {
      return;
    }

    fileInputRef.current?.click();
  }

  function insertImageFromSource(source: string) {
    if (!activeBlockId || !savedRangeRef.current) {
      return;
    }

    const altText = window.prompt("Enter alternative text:") ?? "";

    insertImage(source, altText, savedRangeRef.current, (content) => {
      updateContent(activeBlockId, content);
    });

    savedRangeRef.current = null;
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        insertImageFromSource(reader.result);
      }
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        className="toolsBarBtn"
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        aria-label="Insert image"
        title="Insert image"
      >
        <CiImageOn />
      </button>
    </div>
  );
}

export default Image;
