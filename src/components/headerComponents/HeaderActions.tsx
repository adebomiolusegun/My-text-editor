import { CgDarkMode } from "react-icons/cg";
import { FaRegSave } from "react-icons/fa";
import { LuUndo } from "react-icons/lu";
import { LuRedo } from "react-icons/lu";

function HeaderActions() {
  return (
    <div className="flex w-auto gap-4 border-2 border-gray-300 justify-around items-center rounded-md h-7">
      <div className="flex border-2 gap-3 px-2 border-gray-300 justify-around items-center rounded-md h-7">
        <button className="border-r-2 pr-3 border-gray-300">
          <LuRedo />
        </button>
        <button>
          <LuUndo />
        </button>
      </div>

      <div className=" flex border-2 gap-3 px-2 border-gray-300 justify-around items-center rounded-md h-7">
        <button className="border-r-2 pr-3 border-gray-300">
          <FaRegSave className="" />
        </button>
        <button>
          <CgDarkMode />
        </button>
      </div>
    </div>
  );
}

export default HeaderActions;
