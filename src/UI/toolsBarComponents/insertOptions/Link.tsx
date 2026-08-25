import { CiLink } from "react-icons/ci";

import { useRef } from "react";

import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";
import { insertLink } from "@utilities/insertLink";

function Link() {
  const savedRangeRef = useRef<Range | null>(null);
  const activeBlockId = useEditorStore((state) => state.activeBlockId);
  const updateContent = useEditorStore((state) => state.updateContent);

  function handleMouseDown(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      savedRangeRef.current = null;
      return;
    }

    savedRangeRef.current = selection.getRangeAt(0);
  }

  function handleClick() {
    if (!activeBlockId || !savedRangeRef.current) {
      return;
    }

    const url = window.prompt("Enter a URL:");

    if (!url) {
      return;
    }

    insertLink(url, savedRangeRef.current, (content) => {
      updateContent(activeBlockId, content);
    });

    savedRangeRef.current = null;
  }

  return (
    <div>
      <button
        type="button"
        className="toolsBarBtn"
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        aria-label="Insert link"
        title="Insert link"
      >
        <CiLink />
      </button>
    </div>
  );
}

export default Link;
