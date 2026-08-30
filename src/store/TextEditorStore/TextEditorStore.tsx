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

  /*
   * Merges the block at `id` into the block directly above it:
   * previous block's content gets the current block's content
   * appended, current block is removed, and focus moves to the
   * (now merged) previous block.
   *
   * Used by Backspace at the start of a line, once that line
   * is already a plain paragraph (list formatting, if any, is
   * cleared on the FIRST Backspace via changeListType — this
   * only runs on the following Backspace).
   *
   * Does nothing if there's no previous block to merge into.
   */
  mergeBlockUp: (id) => {
    set((state) => {
      const index = state.blocks.findIndex((block) => block.id === id);

      if (index <= 0) {
        return state;
      }

      const current = state.blocks[index];
      const previous = state.blocks[index - 1];

      const mergedContent = (previous.content || "") + (current.content || "");

      const blocks = [...state.blocks];

      blocks[index - 1] = {
        ...previous,
        content: mergedContent,
      };

      blocks.splice(index, 1);

      return {
        blocks,
        activeBlockId: previous.id,
        pendingFocusId: previous.id,
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
