import { useDropDownHandler } from "@utilities/useDropDownHandler";
import { CiCircleList } from "react-icons/ci";
import { FaListOl, FaListUl } from "react-icons/fa";
import {
  MdFormatListBulletedAdd,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
// import { PiListBulletsLight } from "react-icons/pi";
import type { TextFormatProps } from "src/types";

function BulletList({ id }: TextFormatProps) {
  const { isOpen, handleDropdown } = useDropDownHandler({ id });

  return (
    <div>
      <button onClick={handleDropdown} className="toolsBarBtn">
        <MdFormatListBulletedAdd />
        {isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
      </button>
      {isOpen ? (
        <div className="dropdownContainer  ">
          <button className="toolsBarBtn">
            <FaListOl />
          </button>
          <button className="toolsBarBtn">
            <FaListUl />
          </button>
          <button className="toolsBarBtn">
            <CiCircleList />
          </button>
        </div>
      ) : null}
    </div>
  );
}

<BulletList id="bulletList" />;

export default BulletList;
