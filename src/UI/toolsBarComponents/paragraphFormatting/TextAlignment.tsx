import {
  CiTextAlignCenter,
  CiTextAlignJustify,
  CiTextAlignLeft,
  CiTextAlignRight,
} from "react-icons/ci";

function TextAlignment() {
  return (
    <div className="flex gap-2">
      <button className="toolsBarBtn">
        <CiTextAlignCenter />
      </button>
      <button className="toolsBarBtn">
        <CiTextAlignJustify />
      </button>
      <button className="toolsBarBtn">
        <CiTextAlignLeft />
      </button>
      <button className="toolsBarBtn">
        <CiTextAlignRight />
      </button>
    </div>
  );
}

export default TextAlignment;
