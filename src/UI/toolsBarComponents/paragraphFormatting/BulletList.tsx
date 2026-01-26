import { useDropDownStore } from "@store/DropDownStore";
import {
  MdFormatListBulletedAdd,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { PiListBulletsLight } from "react-icons/pi";
import type { TextFormatProps } from "src/types";

function BulletList({ id }: TextFormatProps) {
  const bulletOpen = useDropDownStore((state) => state.isOpen);
  const toggle = useDropDownStore((state) => state.toggle);

  const isOpen = bulletOpen === id;

  return (
    <div>
      <button onClick={() => toggle(id)} className="toolsBarBtn">
        <MdFormatListBulletedAdd />
        {isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
      </button>
      {isOpen ? (
        <div className="dropdownContainer">
          <button className="toolsBarBtn">
            <PiListBulletsLight />
          </button>
          <button className="toolsBarBtn">
            <PiListBulletsLight />
          </button>
          <button className="toolsBarBtn">
            <PiListBulletsLight />
          </button>
        </div>
      ) : null}
    </div>
  );
}

<BulletList id="bulletList" />;

export default BulletList;
