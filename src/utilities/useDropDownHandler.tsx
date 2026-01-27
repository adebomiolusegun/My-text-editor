import { useDropDownStore } from "@store/DropDownStore";
import { useEffect } from "react";
import type { TextFormatProps } from "src/types";

export const useDropDownHandler = ({ id }: TextFormatProps) => {
  const headingOpen = useDropDownStore((state) => state.isOpen);
  const toggle = useDropDownStore((state) => state.toggle);

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
