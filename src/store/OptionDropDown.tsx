// import { LuHeading1 } from "react-icons/lu";
import type { DropDownOption } from "src/types";
import { create } from "zustand";

export const OptionDropDownStore = create<DropDownOption>((set) => ({
  selectOption: {},
  setOption: (id, icon) =>
    set((state) => ({
      selectOption: { ...state.selectOption, [id]: icon },
    })),
}));
