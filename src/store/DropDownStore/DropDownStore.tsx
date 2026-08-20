import { create } from "zustand";
import type { DropDownState } from "../../Types/types";

export const useDropDownStore = create<DropDownState>((set) => ({
  isOpen: null,
  toggle: (id) => set((state) => ({ isOpen: state.isOpen === id ? null : id })),
}));
