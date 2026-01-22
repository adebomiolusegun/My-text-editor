import { LuHeading1 } from "react-icons/lu";
import { FaBold } from "react-icons/fa6";
import { GoItalic } from "react-icons/go";
import { LuUnderline } from "react-icons/lu";
import { GoStrikethrough } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function TextFormat() {
  return (
    <div className="flex">
      <button className="toolsBarBtn">
        <LuHeading1 />
        <MdOutlineKeyboardArrowDown />
      </button>
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
