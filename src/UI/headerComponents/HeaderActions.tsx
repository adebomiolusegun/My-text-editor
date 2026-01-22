import { CgDarkMode } from "react-icons/cg";
import { FaRegSave } from "react-icons/fa";
import Profile from "./Profile";
// import { LuUndo } from "react-icons/lu";
// import { LuRedo } from "react-icons/lu";

function HeaderActions() {
  return (
    <div className="flex w-auto gap-4 justify-around items-center rounded-md h-7">
      <div className=" headerActionDivider">
        <div className=" flex border-r border-gray-300">
          <button className="headerBtn">
            <FaRegSave className="" />
          </button>
          <button className="headerBtn">
            <CgDarkMode />
          </button>
        </div>
        <button className="headerBtn">
          <Profile />
        </button>
      </div>
    </div>
  );
}

export default HeaderActions;
