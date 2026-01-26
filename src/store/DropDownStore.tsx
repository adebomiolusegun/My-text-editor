import type { DropDownState } from "src/types";
import { create } from "zustand";

export const useDropDownStore = create<DropDownState>((set) => ({
  isOpen: null,
  toggle: (id) => set((state) => ({ isOpen: state.isOpen === id ? null : id })),
}));
