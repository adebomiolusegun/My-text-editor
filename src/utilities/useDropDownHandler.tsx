import { useDropDownStore } from "@store/DropDownStore/DropDownStore";
import { useEffect } from "react";
import type { TextFormatProps } from "../Types/types";

const useDropDownHandler = ({ id }: TextFormatProps) => {
  const { isOpen: headingOpen, toggle } = useDropDownStore();

  const isOpen = headingOpen === id;

  const handleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle(id);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) {
        toggle("");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, toggle, id]);

  return { isOpen, handleDropdown };
};

export default useDropDownHandler;
