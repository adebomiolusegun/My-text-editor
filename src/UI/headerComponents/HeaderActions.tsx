import { FaRegSave } from "react-icons/fa";
import Profile from "./Profile";
import { CiSun } from "react-icons/ci";
import { LuMoonStar } from "react-icons/lu";
import { useDropDownStore } from "@store/DropDownStore";

import type { TextFormatProps } from "src/types";
// import { LuUndo } from "react-icons/lu";
// import { LuRedo } from "react-icons/lu";

function HeaderActions({ id }: TextFormatProps) {
  const open = useDropDownStore((state) => state.isOpen);
  const toggle = useDropDownStore((state) => state.toggle);

  const isOpen = open === id;

  return (
    <div className="flex w-auto gap-4 justify-around items-center rounded-md h-7">
      <div className=" headerActionDivider">
        <div className=" flex border-r border-gray-300">
          <button className="headerBtn">
            <FaRegSave className="" />
          </button>
        </div>
        <div className="flex ">
          {isOpen ? (
            <button className="headerBtn" onClick={() => toggle(id)}>
              <LuMoonStar className="hidden dark:block" />
            </button>
          ) : (
            <button className="headerBtn" onClick={() => toggle(id)}>
              <CiSun className="hidden dark:block" />
            </button>
          )}
        </div>
        <button className="headerBtn">
          <Profile />
        </button>
      </div>
    </div>
  );
}

<HeaderActions id="themeToggle" />;

export default HeaderActions;
