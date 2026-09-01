import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";

import { FaBold } from "react-icons/fa6";
import { GoItalic, GoStrikethrough } from "react-icons/go";
import { LuUnderline } from "react-icons/lu";

import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import formatSelection from "@utilities/formatSelection";
import applyHeadingToSelection from "@utilities/applyHeadingToSelection";
import useDropDownHandler from "@utilities/useDropDownHandler";

import { OptionDropDownStore } from "@store/OptionDropDown/OptionDropDown";
import useEditorStore from "@store/TextEditorStore";

import type { DropDownItem, TextFormatProps } from "../../../Types/types";

const headingOptions: Array<DropDownItem & { tag: string }> = [
  { id: "h1", label: "Heading 1", Icon: LuHeading1, tag: "h1" },
  { id: "h2", label: "Heading 2", Icon: LuHeading2, tag: "h2" },
  { id: "h3", label: "Heading 3", Icon: LuHeading3, tag: "h3" },
  { id: "h4", label: "Heading 4", Icon: LuHeading4, tag: "h4" },
  { id: "h5", label: "Heading 5", Icon: LuHeading5, tag: "h5" },
  { id: "h6", label: "Heading 6", Icon: LuHeading6, tag: "h6" },
];

function TextFormat({ id }: TextFormatProps) {
  const { activeBlockId, updateContent, changeTag } = useEditorStore();
  const { isOpen, handleDropdown } = useDropDownHandler({ id });

  const SelectOption = OptionDropDownStore(
    (state) => state.selectOption[id] ?? headingOptions[0].Icon,
  );

  const setOptions = OptionDropDownStore((state) => state.setOption);

  // shared updater
  const handleUpdate = (content: string) => {
    if (activeBlockId) updateContent(activeBlockId, content);
  };

  return (
    <div className="flex gap-2">
      {/* HEADINGS (BLOCK LEVEL) */}
      <div className="relative">
        <button
          type="button"
          onClick={(e) => handleDropdown(e)}
          className="toolsBarBtn"
        >
          <SelectOption />
          {isOpen ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </button>

        {isOpen && (
          <div className="dropdownContainer">
            {headingOptions.map(({ id: optionId, Icon, tag }) => (
              <button
                key={optionId}
                type="button"
                className="dropdownContent"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setOptions(id, Icon);

                  // Check if text is selected
                  const selection = window.getSelection();
                  const isTextSelected =
                    selection &&
                    !selection.isCollapsed &&
                    selection.toString().trim();

                  if (activeBlockId) {
                    if (isTextSelected) {
                      // Apply heading to selected text only
                      applyHeadingToSelection(tag, handleUpdate);
                    } else {
                      // Apply heading to entire block
                      changeTag(activeBlockId, tag);
                    }
                  }

                  handleDropdown(e);
                }}
              >
                <Icon />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* BOLD */}
      <button
        type="button"
        className="toolsBarBtn"
        onMouseDown={(e) => {
          e.preventDefault();

          formatSelection("fmt-bold", handleUpdate);
        }}
      >
        <FaBold />
      </button>

      {/* ITALIC */}
      <button
        type="button"
        className="toolsBarBtn"
        onMouseDown={(e) => {
          e.preventDefault();

          formatSelection("fmt-italic", handleUpdate);
        }}
      >
        <GoItalic />
      </button>

      {/* UNDERLINE */}
      <button
        type="button"
        className="toolsBarBtn"
        onMouseDown={(e) => {
          e.preventDefault();

          formatSelection("fmt-underline", handleUpdate);
        }}
      >
        <LuUnderline />
      </button>

      {/* STRIKE */}
      <button
        type="button"
        className="toolsBarBtn"
        onMouseDown={(e) => {
          e.preventDefault();

          formatSelection("fmt-strike", handleUpdate);
        }}
      >
        <GoStrikethrough />
      </button>
    </div>
  );
}

export default TextFormat;
