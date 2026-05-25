import { LuUndo } from "react-icons/lu";
import { LuRedo } from "react-icons/lu";
import { MdClear } from "react-icons/md";

function Redo() {
  return (
    <div className="flex gap-2">
      <button className="toolsBarBtn">
        <LuRedo />
      </button>
      <button className="toolsBarBtn">
        <LuUndo />
      </button>
      <button className="toolsBarBtn">
        <MdClear />
      </button>
    </div>
  );
}

export default Redo;
