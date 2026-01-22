import { LuUndo } from "react-icons/lu";
import { LuRedo } from "react-icons/lu";

function Redo() {
  return (
    <div className="flex gap-2">
      <button className="toolsBarBtn">
        <LuRedo />
      </button>
      <button className="toolsBarBtn">
        <LuUndo />
      </button>
    </div>
  );
}

export default Redo;
