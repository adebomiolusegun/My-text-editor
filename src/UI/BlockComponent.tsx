// components/Editor.tsx

import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";
import TextArea from "@components/TextArea/TextArea";
import type { Block } from "@Types/types";

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

  return (
    <div className="mx-auto mt-4 w-full max-w-3xl px-4">
      <div className="editorCanvas flex flex-col gap-2">
        {groups.map((group) => {
          if (!group.listType) {
            /*
             * Not a list: render each block on its own,
             * still with normal spacing between paragraphs
             * / headings.
             */
            return group.items.map((block) => (
              <TextArea key={`${block.id}-${block.tag}`} block={block} />
            ));
          }

          /*
           * A list: ALL consecutive same-type items share
           * ONE <ol>/<ul>. This is what makes numbering and
           * spacing feel like a single continuous list rather
           * than separate boxes stacked up.
           */
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
