import { useState, useRef, useEffect } from "react";
import { FaRegSave } from "react-icons/fa";
import { CiSun } from "react-icons/ci";
import { LuMoonStar } from "react-icons/lu";

import Profile from "./Profile";
import { useDarkModeStore } from "@store/DarkModeStore/DarkModeStore";
import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";
import { exportAsPdf } from "@utilities/exportPdf";
import { exportAsDocx } from "@utilities/exportDocx";

// import { LuUndo } from "react-icons/lu";
// import { LuRedo } from "react-icons/lu";

function HeaderActions() {
  const darkMode = useDarkModeStore((state) => state.isDarkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  const blocks = useEditorStore((state) => state.blocks);

  const [isSaveMenuOpen, setIsSaveMenuOpen] = useState(false);
  const saveMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /*
   * Close the save dropdown when clicking anywhere outside it.
   */
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        saveMenuRef.current &&
        !saveMenuRef.current.contains(e.target as Node)
      ) {
        setIsSaveMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  function handleExport(format: "pdf" | "docx") {
    setIsSaveMenuOpen(false);

    if (format === "docx") {
      exportAsDocx(blocks);
      return;
    }

    if (format === "pdf") {
      const canvas = document.querySelector<HTMLElement>(".editorCanvas");
      if (canvas) {
        exportAsPdf(canvas);
      }
      return;
    }
  }

  return (
    <div className="flex w-auto gap-4 justify-around items-center rounded-md h-7">
      <div className="headerActionDivider">
        <div className="flex borderRight relative" ref={saveMenuRef}>
          <button
            type="button"
            className="headerBtn"
            onClick={() => setIsSaveMenuOpen((v) => !v)}
          >
            <FaRegSave />
          </button>

          {isSaveMenuOpen && (
            <div className="dropdownContainer">
              <button
                type="button"
                className="dropdownContent"
                onClick={() => handleExport("pdf")}
              >
                Export as PDF
              </button>
              <button
                type="button"
                className="dropdownContent"
                onClick={() => handleExport("docx")}
              >
                Export as Word (.docx)
              </button>
            </div>
          )}
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
