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
import type { DropDownItem, TextFormatProps } from "src/types";
import { OptionDropDownStore } from "@store/OptionDropDown";

const headingOptions: DropDownItem[] = [
  { id: "h1", Icon: LuHeading1 },
  { id: "h2", Icon: LuHeading2 },
  { id: "h3", Icon: LuHeading3 },
  { id: "h4", Icon: LuHeading4 },
  { id: "h5", Icon: LuHeading5 },
  { id: "h6", Icon: LuHeading6 },
];

function TextFormat({ id }: TextFormatProps) {
  const { isOpen, handleDropdown } = useDropDownHandler({ id });
  const SelectOption = OptionDropDownStore(
    (state) => state.selectOption[id] ?? LuHeading1,
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
            {headingOptions.map(({ id: optionId, Icon }) => (
              <div
                key={optionId}
                className="dropdownContent cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setOptions(id, Icon);
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
