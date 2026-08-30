import { CiCircleList } from "react-icons/ci";
import { FaListOl, FaListUl } from "react-icons/fa";

import {
  MdFormatListBulletedAdd,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import type {
  DropDownItem,
  TextFormatProps,
  listType,
} from "../../../Types/types";

import { OptionDropDownStore } from "@store/OptionDropDown/OptionDropDown";
import useDropDownHandler from "@utilities/useDropDownHandler";
import { saveEditorSnapshot } from "@utilities/saveEditorSnapshot";
import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";

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

  const activeBlockId = useEditorStore((state) => state.activeBlockId);

  const activeBlock = useEditorStore((state) =>
    state.blocks.find((block) => block.id === state.activeBlockId),
  );

  const changeListType = useEditorStore((state) => state.changeListType);

  return (
    <div>
      <button type="button" onClick={handleDropdown} className="toolsBarBtn">
        <SelectOption />

        {isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
      </button>

      {isOpen && (
        <div className="dropdownContainer">
          {bulletOptions.map(({ id: optionId, Icon }) => {
            const isActive = activeBlock?.listType === optionId;

            return (
              <button
                key={optionId}
                type="button"
                className={`toolsBarBtn ${isActive ? "activeListOption" : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (!activeBlockId) {
                    return;
                  }

                  saveEditorSnapshot();

                  if (isActive) {
                    changeListType(activeBlockId, undefined);
                    setOptions(id, MdFormatListBulletedAdd);
                  } else {
                    changeListType(activeBlockId, optionId as listType);
                    setOptions(id, Icon);
                  }

                  handleDropdown(e);
                }}
              >
                <Icon />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BulletList;
