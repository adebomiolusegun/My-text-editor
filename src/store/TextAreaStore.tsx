import type { TextAreaState } from "src/types";
import { create } from "zustand";

export const useTextAreaStore = create<TextAreaState>((set) => ({
  textAreaContent: "",
  setTextAreaContent: (content) => set({ textAreaContent: content }),
}));
