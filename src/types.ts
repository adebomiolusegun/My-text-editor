import type { IconType } from "react-icons";

export interface DropDownState {
  isOpen: string | null;
  toggle: (id: string) => void;
}

export interface TextFormatProps {
  id: string;
}

export interface TextAreaState {
  textAreaContent: string;
  setTextAreaContent: (content: string) => void;
}

export interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export type DropDownItem = {
  id: string;
  Icon: IconType;
};

export interface DropDownOption {
  selectOption: Record<string, IconType>;
  setOption: (id: string, icon: IconType) => void;
}
