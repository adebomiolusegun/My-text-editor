import { create } from "zustand";
import type { RedoUndoState } from "../types";

export const useRedoUndoStore = create<RedoUndoState>((set, get) => ({
  undo: [],
<<<<<<< HEAD
  current: "",
  redo: [],

  setCurrent: (value) =>
    set((state) => ({
      undo:
        state.current !== value ? [...state.undo, state.current] : state.undo,

=======
  redo: [],
  current: "",

  setCurrent: (value) =>
    set((state) => ({
      undo: [...state.undo, state.current],
>>>>>>> text-editing
      current: value,
      redo: [],
    })),

<<<<<<< HEAD
  setUndo: () => {
    const { undo, current, redo } = get();

=======
  undoAction: () => {
    const { undo, current, redo } = get();
>>>>>>> text-editing
    if (undo.length === 0) return;

    const previous = undo[undo.length - 1];

    set({
      undo: undo.slice(0, -1),
<<<<<<< HEAD
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
=======
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
>>>>>>> text-editing
}));
