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
import { useDropDownHandler } from "@utilities/useDropDownHandler";

import { OptionDropDownStore } from "@store/OptionDropDown";
import type { DropDownItem, TextFormatProps } from "../../../types";
import { useEditorStore } from "@store/TextEditorStore";

const headingOptions: DropDownItem[] = [
  { id: "h1", label: "Heading 1", Icon: LuHeading1, tag: "h1" },
  { id: "h2", label: "Heading 2", Icon: LuHeading2, tag: "h2" },
  { id: "h3", label: "Heading 3", Icon: LuHeading3, tag: "h3" },
  { id: "h4", label: "Heading 4", Icon: LuHeading4, tag: "h4" },
  { id: "h5", label: "Heading 5", Icon: LuHeading5, tag: "h5" },
  { id: "h6", label: "Heading 6", Icon: LuHeading6, tag: "h6" },
];

function TextFormat({ id }: TextFormatProps) {
  const { changeTag } = useEditorStore();
  const { isOpen, handleDropdown } = useDropDownHandler({ id });
  const SelectOption = OptionDropDownStore(
    (state) => state.selectOption[id] ?? headingOptions[0].Icon,
  );
  const setOptions = OptionDropDownStore((state) => state.setOption);

  return (
    <div className="flex gap-2">
      <div className="relative">
        <button onClick={(e) => handleDropdown(e)} className="toolsBarBtn">
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
              <div
                key={optionId}
                className="dropdownContent cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOptions(id, Icon);
                  changeTag(id, tag);
                  handleDropdown(e);
                }}
              >
                <Icon />
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="toolsBarBtn">
        <FaBold />
      </button>
      <button className="toolsBarBtn">
        <GoItalic />
      </button>
      <button className="toolsBarBtn">
        <LuUnderline />
      </button>
      <button className="toolsBarBtn">
        <GoStrikethrough />
      </button>
    </div>
  );
}

export default TextFormat;
