import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";
import { useRedoUndoStore } from "@store/RedoUndoStore/RedoUndoStore";

export function saveEditorSnapshot() {
  const blocks = useEditorStore.getState().blocks;

  useRedoUndoStore.getState().saveSnapshot(blocks);
}
