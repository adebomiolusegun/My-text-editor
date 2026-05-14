import { create } from "zustand";
import type { RedoUndoState } from "../types";

export const useRedoUndoStore = create<RedoUndoState>((set, get) => ({
  undo: [],
  redo: [],
  current: "",

  setCurrent: (value) =>
    set((state) => ({
      undo: [...state.undo, state.current],
      current: value,
      redo: [],
    })),

  undoAction: () => {
    const { undo, current, redo } = get();
    if (undo.length === 0) return;

    const previous = undo[undo.length - 1];

    set({
      undo: undo.slice(0, -1),
      redo: [current, ...redo],
      current: previous,
    });
  },

  redoAction: () => {
    const { undo, current, redo } = get();
    if (redo.length === 0) return;

    const next = redo[0];

    set({
      undo: [...undo, current],
      redo: redo.slice(1),
      current: next,
    });
  },

  clear: () => {
    set({
      undo: [],
      current: "",
      redo: [],
    });
  },
}));
