<<<<<<< HEAD
=======
// import { LuHeading1 } from "react-icons/lu";

>>>>>>> text-editing
import { create } from "zustand";
import type { DropDownOption } from "../types";

export const OptionDropDownStore = create<DropDownOption>((set) => ({
  selectOption: {},
  setOption: (id, icon) =>
    set((state) => ({
      selectOption: { ...state.selectOption, [id]: icon },
    })),
}));
