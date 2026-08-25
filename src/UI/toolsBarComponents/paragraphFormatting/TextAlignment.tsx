import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";
import {
  CiTextAlignCenter,
  CiTextAlignJustify,
  CiTextAlignLeft,
  CiTextAlignRight,
} from "react-icons/ci";

function TextAlignment() {
  const { activeBlockId, changeAlignment } = useEditorStore();
  return (
    <div className="flex gap-2">
      <button
        className="toolsBarBtn"
        onClick={() => changeAlignment(activeBlockId!, "center")}
      >
        <CiTextAlignCenter />
      </button>
      <button
        className="toolsBarBtn"
        onClick={() => changeAlignment(activeBlockId!, "justify")}
      >
        <CiTextAlignJustify />
      </button>
      <button
        className="toolsBarBtn"
        onClick={() => changeAlignment(activeBlockId!, "left")}
      >
        <CiTextAlignLeft />
      </button>
      <button
        className="toolsBarBtn"
        onClick={() => changeAlignment(activeBlockId!, "right")}
      >
        <CiTextAlignRight />
      </button>
    </div>
  );
}

export default TextAlignment;
