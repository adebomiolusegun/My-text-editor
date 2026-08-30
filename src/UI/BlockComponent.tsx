// components/Editor.tsx

import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";
import TextArea from "@components/TextArea/TextArea";
import { focusElementEnd } from "@utilities/caret";
import type { Block } from "@Types/types";
import type { MouseEvent } from "react";

function Editor() {
  const blocks = useEditorStore((s) => s.blocks);

  const groups: { listType: Block["listType"]; items: Block[] }[] = [];

  for (const block of blocks) {
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.listType === block.listType && block.listType) {
      lastGroup.items.push(block);
    } else {
      groups.push({ listType: block.listType, items: [block] });
    }
  }

  /*
   * Clicking anywhere in the canvas that ISN'T already
   * inside a contentEditable line (e.g. empty space below
   * the last block, or gaps around list wrappers) should
   * still focus an editable line — matching how a normal
   * text editor feels, since the canvas itself is not
   * editable, only individual blocks are.
   */
  function handleCanvasClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;

    if (target.closest('[contenteditable="true"]')) {
      return;
    }

    const container = e.currentTarget;
    const editables = container.querySelectorAll<HTMLElement>(
      '[contenteditable="true"]',
    );
    const last = editables[editables.length - 1];

    if (last) {
      focusElementEnd(last);
    }
  }

  return (
    <div className="mx-auto mt-4 w-full max-w-3xl px-4">
      <div
        className="editorCanvas flex flex-col gap-2 cursor-text"
        onClick={handleCanvasClick}
      >
        {groups.map((group) => {
          if (!group.listType) {
            return group.items.map((block) => (
              <TextArea key={`${block.id}-${block.tag}`} block={block} />
            ));
          }

          const ListTag = group.listType === "list-ol" ? "ol" : "ul";
          const key = group.items[0].id;

          return (
            <ListTag key={key} className="editorList">
              {group.items.map((block) => (
                <TextArea key={`${block.id}-${block.tag}`} block={block} />
              ))}
            </ListTag>
          );
        })}
      </div>
    </div>
  );
}

export default Editor;
