import { useRedoUndoStore } from "@store/RedoUndoStore";
import { LuUndo } from "react-icons/lu";
import { LuRedo } from "react-icons/lu";
import { MdClear } from "react-icons/md";

function Redo() {
  const { setUndo, setRedo, clear } = useRedoUndoStore();

  return (
    <div className="flex gap-2">
      <button className="toolsBarBtn" onClick={setRedo}>
        <LuRedo />
      </button>
      <button className="toolsBarBtn" onClick={setUndo}>
        <LuUndo />
      </button>
      <button className="toolsBarBtn" onClick={clear}>
        <MdClear />
      </button>
    </div>
  );
}

export default Redo;
