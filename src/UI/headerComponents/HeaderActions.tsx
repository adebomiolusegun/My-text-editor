import { FaRegSave } from "react-icons/fa";
import Profile from "./Profile";
import { CiSun } from "react-icons/ci";
import { LuMoonStar } from "react-icons/lu";
import { useDarkModeStore } from "@store/DarkModeStore";
import { useEffect } from "react";

// import { LuUndo } from "react-icons/lu";
// import { LuRedo } from "react-icons/lu";

function HeaderActions() {
  const darkMode = useDarkModeStore((state) => state.isDarkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex w-auto gap-4 justify-around items-center rounded-md h-7">
      <div className=" headerActionDivider">
        <div className=" flex borderRight ">
          <button className="headerBtn">
            <FaRegSave className="" />
          </button>
        </div>
        <div className="headerBtn">
          <button onClick={() => toggleDarkMode()}>
            {darkMode ? <CiSun /> : <LuMoonStar />}
          </button>
        </div>
        <button className="headerBtn">
          <Profile />
        </button>
      </div>
    </div>
  );
}

{
  /* <HeaderActions id="themeToggle" />; */
}

export default HeaderActions;
