import { create } from "zustand";
import type { DropDownOption } from "../../Types/types";

export const OptionDropDownStore = create<DropDownOption>((set) => ({
  selectOption: {},
  setOption: (id, icon) =>
    set((state) => ({
      selectOption: { ...state.selectOption, [id]: icon },
    })),
}));
