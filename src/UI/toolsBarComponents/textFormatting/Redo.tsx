import { LuRedo, LuUndo } from "react-icons/lu";
import { MdClear } from "react-icons/md";

import { useRedoUndoStore } from "@store/RedoUndoStore/RedoUndoStore";
import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";

import { saveEditorSnapshot } from "@utilities/saveEditorSnapshot";

function Redo() {
  const undoAction = useRedoUndoStore((state) => state.undoAction);

  const redoAction = useRedoUndoStore((state) => state.redoAction);

  const setBlocks = useEditorStore((state) => state.setBlocks);

  function handleUndo() {
    const currentBlocks = useEditorStore.getState().blocks;

    const previousBlocks = undoAction(currentBlocks);

    if (!previousBlocks) {
      return;
    }

    setBlocks(previousBlocks);
  }

  function handleRedo() {
    const currentBlocks = useEditorStore.getState().blocks;

    const nextBlocks = redoAction(currentBlocks);

    if (!nextBlocks) {
      return;
    }

    setBlocks(nextBlocks);
  }

  function handleClear() {
    /*
     * Save the current document before clearing.
     */
    saveEditorSnapshot();

    /*
     * Clear the document.
     */
    setBlocks([
      {
        id: crypto.randomUUID(),
        tag: "p",
        content: "",
      },
    ]);
  }

  return (
    <div className="flex gap-2">
      <button type="button" onClick={handleRedo} className="toolsBarBtn">
        <LuRedo />
      </button>

      <button type="button" onClick={handleUndo} className="toolsBarBtn">
        <LuUndo />
      </button>

      <button type="button" onClick={handleClear} className="toolsBarBtn">
        <MdClear />
      </button>
    </div>
  );
}

export default Redo;
