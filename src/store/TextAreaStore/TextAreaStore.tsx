import { create } from "zustand";
import type { TextAreaState } from "../../Types/types";

export const useTextAreaStore = create<TextAreaState>((set) => ({
  textAreaContent: "",
  setTextAreaContent: (content) => set({ textAreaContent: content }),
}));
