import { useRedoUndoStore } from "@store/RedoUndoStore/RedoUndoStore";

function Footer() {
  const { current } = useRedoUndoStore();

  return (
    <div className="footerStyle">
      <div>
        <p>Number of characters: {current.length}</p>
      </div>

      <div>
        <p>
          Number of words: {current.trim().split(/\s+/).filter(Boolean).length}
        </p>
      </div>
    </div>
  );
}

export default Footer;
