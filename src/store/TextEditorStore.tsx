import { create } from "zustand";
import type { Block, EditorStore } from "../types";

const generateId = () => crypto.randomUUID();

export const useEditorStore = create<EditorStore>((set) => ({
  blocks: [{ id: generateId(), tag: "p", content: "" }],

  activeBlockId: null,

  setActiveBlock: (id) => set({ activeBlockId: id }),

  updateContent: (id, content) =>
    set((state) => ({
      blocks: state.blocks.map((b) => (b.id === id ? { ...b, content } : b)),
    })),

  changeTag: (id, tag) =>
    set((state) => ({
      blocks: state.blocks.map((b) => (b.id === id ? { ...b, tag } : b)),
    })),

  addBlockAfter: (id) =>
    set((state) => {
      const index = state.blocks.findIndex((b) => b.id === id);

      const newBlock: Block = {
        id: generateId(),
        tag: "p",
        content: "",
      };

      const updated = [...state.blocks];
      updated.splice(index + 1, 0, newBlock);

      return {
        blocks: updated,
        activeBlockId: newBlock.id,
      };
    }),

  deleteBlock: (id) =>
    set((state) => {
      if (state.blocks.length === 1) return state;

      const index = state.blocks.findIndex((b) => b.id === id);
      const prev = state.blocks[index - 1];

      return {
        blocks: state.blocks.filter((b) => b.id !== id),
        activeBlockId: prev?.id ?? null,
      };
    }),
}));
