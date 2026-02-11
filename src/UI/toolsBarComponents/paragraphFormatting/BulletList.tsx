import { OptionDropDownStore } from "@store/OptionDropDown";
import { useDropDownHandler } from "@utilities/useDropDownHandler";
// import { useState } from "react";
// import type { IconType } from "react-icons";
import { CiCircleList } from "react-icons/ci";
import { FaListOl, FaListUl } from "react-icons/fa";
import {
  MdFormatListBulletedAdd,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
// import { PiListBulletsLight } from "react-icons/pi";
import type { DropDownItem, TextFormatProps } from "src/types";

const bulletOptions: DropDownItem[] = [
  { id: "list1", Icon: FaListOl },
  { id: "list1", Icon: FaListUl },
  { id: "list1", Icon: CiCircleList },
];

function BulletList({ id }: TextFormatProps) {
  const { isOpen, handleDropdown } = useDropDownHandler({ id });
  const SelectOption = OptionDropDownStore(
    (state) => state.selectOption[id] ?? MdFormatListBulletedAdd,
  );
  const setOptions = OptionDropDownStore((state) => state.setOption);
  return (
    <div>
      <button onClick={handleDropdown} className="toolsBarBtn">
        <SelectOption />
        {isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
      </button>
      {isOpen ? (
        <div className="dropdownContainer  ">
          {bulletOptions.map(({ id: optionId, Icon }) => (
            <button
              key={optionId}
              className="toolsBarBtn"
              onClick={(e) => {
                e.stopPropagation();
                setOptions(id, Icon);
                handleDropdown(e);
              }}
            >
              <Icon />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

<BulletList id="bulletList" />;

export default BulletList;
