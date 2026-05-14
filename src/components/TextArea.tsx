import { useRedoUndoStore } from "@store/RedoUndoStore";

function TextArea() {
  const { current, setCurrent } = useRedoUndoStore();

  const maxLength = 1000;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;

    if (value.length <= maxLength) {
      setCurrent(value);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <textarea
          value={current}
          onChange={handleChange}
          name=""
          id="message"
          contentEditable
          suppressContentEditableWarning
          placeholder="Write your text here..."
          className="textAreaStyle"
        ></textarea>
      </div>
    </>
  );
}

export default TextArea;
