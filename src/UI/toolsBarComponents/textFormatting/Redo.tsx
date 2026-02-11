import { useTextAreaStore } from "@store/TextAreaStore";
import { LuUndo } from "react-icons/lu";
import { LuRedo } from "react-icons/lu";
import { MdClear } from "react-icons/md";

function Redo() {
  const setText = useTextAreaStore((state) => state.setTextAreaContent);
  function handleClear() {
    setText("");
  }
  return (
    <div className="flex gap-2">
      <button className="toolsBarBtn">
        <LuRedo />
      </button>
      <button className="toolsBarBtn">
        <LuUndo />
      </button>
      <button onClick={handleClear} className="toolsBarBtn">
        <MdClear />
      </button>
    </div>
  );
}

export default Redo;
