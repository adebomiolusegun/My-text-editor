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
