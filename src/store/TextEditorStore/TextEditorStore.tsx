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

  pendingFocusId: null,

  clearPendingFocus: () =>
    set({
      pendingFocusId: null,
    }),

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
      pendingFocusId: id,
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

  changeListType: (id, listType) => {
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id
          ? {
              ...block,
              listType,
            }
          : block,
      ),
      pendingFocusId: id,
      activeBlockId: id,
    }));
  },

  /*
   * `overrides` lets a caller force specific values on the
   * new block instead of inheriting from the current one.
   *
   * - No `overrides` passed -> inherit tag + listType
   *   (used by Shift+Enter to continue a list).
   * - `overrides` passed -> use those values exactly, even
   *   if a key is explicitly `undefined`
   *   (used by plain Enter to force a fresh "p" paragraph
   *   and clear any listType).
   */
  addBlockAfter: (id, overrides) => {
    set((state) => {
      const index = state.blocks.findIndex((block) => block.id === id);

      if (index === -1) {
        return state;
      }

      const currentBlock = state.blocks[index];

      const newBlock: Block = {
        id: generateId(),
        tag:
          overrides && "tag" in overrides ? overrides.tag! : currentBlock.tag,
        content: "",
        listType:
          overrides && "listType" in overrides
            ? overrides.listType
            : currentBlock.listType,
        alignment: currentBlock.alignment,
      };

      const blocks = [...state.blocks];

      blocks.splice(index + 1, 0, newBlock);

      return {
        blocks,
        pendingFocusId: newBlock.id,
        activeBlockId: newBlock.id,
      };
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
