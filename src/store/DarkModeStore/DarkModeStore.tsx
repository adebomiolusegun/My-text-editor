import { create } from "zustand";
import type { DarkModeState } from "../../Types/types";

export const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
