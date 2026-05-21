import type { IconType } from "react-icons";

export type BlockTag = "p" | "h1" | "h2" | "h3";
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
  label: string;
};

export interface DropDownOption {
  selectOption: Record<string, IconType>;
  setOption: (id: string, icon: IconType) => void;
}

export interface RedoUndoState {
  undo: string[];
  current: string;
  redo: string[];

<<<<<<< HEAD
  setCurrent: (state: string) => void;
  setUndo: () => void;
  setRedo: () => void;
  clear: () => void;
}
=======
  setCurrent: (value: string) => void;
  undoAction: () => void;
  redoAction: () => void;
  clear: () => void;
}

export type Block = {
  id: string;
  tag: BlockTag;
  content: string;
};

export type EditorStore = {
  blocks: Block[];
  activeBlockId: string | null;

  setActiveBlock: (id: string) => void;
  updateContent: (id: string, content: string) => void;
  changeTag: (id: string, tag: BlockTag) => void;
  addBlockAfter: (id: string) => void;
  deleteBlock: (id: string) => void;
};
>>>>>>> text-editing
