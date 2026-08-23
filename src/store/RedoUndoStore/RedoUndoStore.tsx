import { create } from "zustand";
import type { Block } from "../../Types/types";

type RedoUndoStore = {
  undoStack: Block[][];
  redoStack: Block[][];

  saveSnapshot: (blocks: Block[]) => void;

  undoAction: (currentBlocks: Block[]) => Block[] | null;

  redoAction: (currentBlocks: Block[]) => Block[] | null;

  clearHistory: () => void;
};

const cloneBlocks = (blocks: Block[]): Block[] => {
  return blocks.map((block) => ({
    ...block,
  }));
};

export const useRedoUndoStore = create<RedoUndoStore>((set, get) => ({
  undoStack: [],
  redoStack: [],

  /*
   * Save the current document BEFORE making
   * a change.
   */
  saveSnapshot: (blocks) => {
    set((state) => ({
      undoStack: [...state.undoStack, cloneBlocks(blocks)],

      /*
       * Once a new edit is made, the old
       * redo history is no longer valid.
       */
      redoStack: [],
    }));
  },

  /*
   * UNDO
   */
  undoAction: (currentBlocks) => {
    const { undoStack } = get();

    if (undoStack.length === 0) {
      return null;
    }

    const previousBlocks = undoStack[undoStack.length - 1];

    set((state) => ({
      /*
       * Remove the state we're going back to.
       */
      undoStack: state.undoStack.slice(0, -1),

      /*
       * Save the current state for REDO.
       */
      redoStack: [...state.redoStack, cloneBlocks(currentBlocks)],
    }));

    return cloneBlocks(previousBlocks);
  },

  /*
   * REDO
   */
  redoAction: (currentBlocks) => {
    const { redoStack } = get();

    if (redoStack.length === 0) {
      return null;
    }

    const nextBlocks = redoStack[redoStack.length - 1];

    set((state) => ({
      /*
       * Remove the state we're redoing.
       */
      redoStack: state.redoStack.slice(0, -1),

      /*
       * Save current state so it can be undone.
       */
      undoStack: [...state.undoStack, cloneBlocks(currentBlocks)],
    }));

    return cloneBlocks(nextBlocks);
  },

  clearHistory: () => {
    set({
      undoStack: [],
      redoStack: [],
    });
  },
}));
