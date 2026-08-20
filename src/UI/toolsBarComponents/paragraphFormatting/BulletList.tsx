// import { useState } from "react";
// import type { IconType } from "react-icons";
import { CiCircleList } from "react-icons/ci";
import { FaListOl, FaListUl } from "react-icons/fa";
import {
  MdFormatListBulletedAdd,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import type { DropDownItem, TextFormatProps } from "../../../Types/types";

import { OptionDropDownStore } from "@store/OptionDropDown/OptionDropDown";
import useDropDownHandler from "@utilities/useDropDownHandler";

// import { PiListBulletsLight } from "react-icons/pi";

const bulletOptions: DropDownItem[] = [
  { id: "list-ol", label: "Numbered list", Icon: FaListOl },
  { id: "list-ul", label: "Bulleted list", Icon: FaListUl },
  { id: "list-circle", label: "Circle list", Icon: CiCircleList },
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

export default BulletList;
