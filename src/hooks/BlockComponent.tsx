// components/Editor.tsx

import TextArea from "@components/TextArea";
import { useEditorStore } from "@store/TextEditorStore";

function Editor() {
  const blocks = useEditorStore((s) => s.blocks);

  return (
    <div className=" mx-auto mt-4 w-full max-w-3xl px-4 ">
      <div className=" w-full flex flex-col gap-2 rounded-md p-4">
        {blocks?.length > 0 &&
          blocks.map((block) =>
            block ? <TextArea key={block.id} block={block} /> : null,
          )}
      </div>
    </div>
  );
}

export default Editor;
