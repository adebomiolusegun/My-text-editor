import type { IconType } from "react-icons";

export type BlockTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type Block = {
  id: string;
  tag: BlockTag;
  content: string;
};

export interface DropDownState {
  isOpen: string | null;
  toggle: (id: string) => void;
}

export interface DarkModeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export type DropDownItem = {
  tag?: BlockTag;
  id: string;
  Icon: IconType;
  label: string;
};

export interface DropDownOption {
  selectOption: Record<string, IconType>;
  setOption: (id: string, icon: IconType) => void;
}

export type EditorStore = {
  blocks: Block[];
  activeBlockId: string | null;

  setActiveBlock: (id: string) => void;
  setBlocks: (blocks: Block[]) => void;
  updateContent: (id: string, content: string) => void;
  changeTag: (id: string, tag: BlockTag) => void;
  addBlockAfter: (id: string) => void;
  deleteBlock: (id: string) => void;
};
export interface TextFormatProps {
  id: string;
}

export interface TextAreaState {
  textAreaContent: string;
  setTextAreaContent: (content: string) => void;
}

export interface RedoUndoState {
  undo: Block[][];
  redo: Block[][];
  current: Block[];

  initialize: (blocks: Block[]) => void;

  setCurrent: (blocks: Block[]) => void;

  undoAction: () => Block[] | null;

  redoAction: () => Block[] | null;
}
