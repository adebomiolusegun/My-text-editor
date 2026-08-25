import { create } from "zustand";

import type { Block, EditorStore } from "../../Types/types";

const generateId = () => {
  return Math.random().toString(36).slice(2, 11);
};

const cloneBlocks = (blocks: Block[]): Block[] => {
  return blocks.map((block) => ({
    ...block,
  }));
};

export const useEditorStore = create<EditorStore>((set, get) => ({
  blocks: [
    {
      id: generateId(),
      tag: "p",
      content: "",
      alignment: "left",
    },
  ],

  activeBlockId: null,

  setActiveBlock: (id) =>
    set({
      activeBlockId: id,
    }),

  setBlocks: (blocks) =>
    set({
      blocks: cloneBlocks(blocks),
    }),

  updateContent: (id, content) => {
    const currentBlocks = get().blocks;

    const updatedBlocks = currentBlocks.map((block) =>
      block.id === id
        ? {
            ...block,
            content,
          }
        : block,
    );

    set({
      blocks: updatedBlocks,
    });
  },

  changeTag: (id, tag) => {
    const currentBlocks = get().blocks;

    const block = currentBlocks.find((block) => block.id === id);

    if (!block) return;

    const updatedBlocks = currentBlocks.map((block) =>
      block.id === id
        ? {
            ...block,
            tag,
          }
        : block,
    );

    set({
      blocks: updatedBlocks,
    });
  },

  changeAlignment: (id, alignment) => {
    const currentBlocks = get().blocks;

    const block = currentBlocks.find((block) => block.id === id);

    if (!block) return;

    const updatedBlocks = currentBlocks.map((block) => {
      if (block.id === id) {
        return {
          ...block,
          alignment,
        };
      }
      return block;
    });

    set({
      blocks: updatedBlocks,
    });
  },

  addBlockAfter: (id) => {
    const currentBlocks = get().blocks;

    const index = currentBlocks.findIndex((block) => block.id === id);

    const newBlock: Block = {
      id: generateId(),
      tag: "p",
      content: "",
    };

    if (index === -1) {
      set({
        blocks: [...currentBlocks, newBlock],
        activeBlockId: newBlock.id,
      });

      return;
    }

    const blocks = [...currentBlocks];

    blocks.splice(index + 1, 0, newBlock);

    set({
      blocks,
      activeBlockId: newBlock.id,
    });
  },

  deleteBlock: (id) => {
    const currentBlocks = get().blocks;

    const blocks = currentBlocks.filter((block) => block.id !== id);

    set({
      blocks,

      activeBlockId: blocks.length > 0 ? blocks[0].id : null,
    });
  },
}));

export default useEditorStore;
