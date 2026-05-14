import { create } from "zustand";
import type { RedoUndoState } from "../types";

export const useRedoUndoStore = create<RedoUndoState>((set, get) => ({
  undo: [],
  current: "",
  redo: [],

  setCurrent: (value) =>
    set((state) => ({
      undo:
        state.current !== value ? [...state.undo, state.current] : state.undo,

      current: value,
      redo: [],
    })),

  setUndo: () => {
    const { undo, current, redo } = get();

    if (undo.length === 0) return;

    const previous = undo[undo.length - 1];

    set({
      undo: undo.slice(0, -1),
      current: previous,
      redo: [...redo, current],
    });
  },

  setRedo: () => {
    const { undo, current, redo } = get();

    if (redo.length === 0) return;

    const next = redo[redo.length - 1];

    set({
      undo: [...undo, current],
      current: next,
      redo: redo.slice(0, -1),
    });
  },

  clear: () =>
    set((state) => ({
      undo: [...state.undo, state.current],
      current: "",
      redo: [],
    })),
}));
