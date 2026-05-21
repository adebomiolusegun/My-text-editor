<<<<<<< HEAD
import { useRedoUndoStore } from "@store/RedoUndoStore";

function Footer() {
  // const text = useTextAreaStore((state) => state.textAreaContent);
  const { current } = useRedoUndoStore();
=======
function Footer() {
  const current = document.getElementById("editor")?.innerText || "";
>>>>>>> text-editing
  return (
    <div className="footerStyle">
      <div>
        <p>Number of characters: {current.length}</p>
      </div>

      <div>
        <p>
<<<<<<< HEAD
          Number of words:
          {current.trim().split(/\s+/).filter(Boolean).length}
=======
          Number of words: {current.trim().split(/\s+/).filter(Boolean).length}
>>>>>>> text-editing
        </p>
      </div>
    </div>
  );
}

export default Footer;
