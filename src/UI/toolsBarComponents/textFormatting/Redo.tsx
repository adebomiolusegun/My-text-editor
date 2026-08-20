import { useRedoUndoStore } from "@store/RedoUndoStore/RedoUndoStore";
import { LuUndo } from "react-icons/lu";
import { LuRedo } from "react-icons/lu";
import { MdClear } from "react-icons/md";

function Redo() {
  const { redoAction, undoAction, clear } = useRedoUndoStore();
  return (
    <div className="flex gap-2">
      <button onClick={redoAction} className="toolsBarBtn">
        <LuRedo />
      </button>
      <button onClick={undoAction} className="toolsBarBtn">
        <LuUndo />
      </button>
      <button onClick={clear} className="toolsBarBtn">
        <MdClear />
      </button>
    </div>
  );
}

export default Redo;
