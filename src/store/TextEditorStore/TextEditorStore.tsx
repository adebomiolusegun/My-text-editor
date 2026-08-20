import { create } from "zustand";
import type { Block, EditorStore } from "../../Types/types";

const generateId = () => Math.random().toString(36).slice(2, 11);

export const useEditorStore = create<EditorStore>((set) => ({
  blocks: [
    {
      id: generateId(),
      tag: "p",
      content: "Start writing...",
    },
  ],
  activeBlockId: null,
  setActiveBlock: (id) => set({ activeBlockId: id }),
  updateContent: (id, content) =>
    set((state) => ({
      blocks: state.blocks.map((block) =>
        block.id === id ? { ...block, content } : block,
      ),
    })),

  changeTag: (id, tag) =>
    set((state) => {
      const block = state.blocks.find((b) => b.id === id);

      if (!block) return state;

      return {
        blocks: state.blocks.map((b) =>
          b.id === id
            ? {
                ...b,
                tag,
              }
            : b,
        ),
      };
    }),

  addBlockAfter: (id) =>
    set((state) => {
      const index = state.blocks.findIndex((block) => block.id === id);
      const newBlock: Block = {
        id: generateId(),
        tag: "p",
        content: "",
      };

      if (index === -1) {
        return {
          blocks: [...state.blocks, newBlock],
          activeBlockId: newBlock.id,
        };
      }

      const blocks = [...state.blocks];
      blocks.splice(index + 1, 0, newBlock);

      return {
        blocks,
        activeBlockId: newBlock.id,
      };
    }),

  deleteBlock: (id) =>
    set((state) => {
      const blocks = state.blocks.filter((block) => block.id !== id);
      return {
        blocks,
        activeBlockId: blocks.length > 0 ? blocks[0].id : null,
      };
    }),
}));

export default useEditorStore;
