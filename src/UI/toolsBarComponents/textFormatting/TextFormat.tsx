import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";
import { FaBold } from "react-icons/fa6";
import { GoItalic } from "react-icons/go";
import { LuUnderline } from "react-icons/lu";
import { GoStrikethrough } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useDropDownHandler } from "@utilities/useDropDownHandler";
import type { TextFormatProps } from "src/types";

function TextFormat({ id }: TextFormatProps) {
  const { isOpen, handleDropdown } = useDropDownHandler({ id });
  return (
    <div className="flex gap-2">
      <div>
        <button onClick={handleDropdown} className="toolsBarBtn">
          <LuHeading1 />
          {isOpen ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </button>
        {isOpen ? (
          <div className="dropdownContainer">
            <div className="dropdownContent">
              <LuHeading2 />
            </div>
            <div className="dropdownContent">
              <LuHeading3 />
            </div>
            <div className="dropdownContent">
              <LuHeading4 />
            </div>
            <div className="dropdownContent">
              <LuHeading5 />
            </div>
            <div className="dropdownContent">
              <LuHeading6 />
            </div>
          </div>
        ) : null}
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

<TextFormat id="textFormat" />;

export default TextFormat;
