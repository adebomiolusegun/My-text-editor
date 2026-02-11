import { useTextAreaStore } from "@store/TextAreaStore";

function TextArea() {
  const text = useTextAreaStore((state) => state.textAreaContent);
  const setText = useTextAreaStore((state) => state.setTextAreaContent);

  const maxLength = 1000;

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    // setText(value.length <= maxLength ? e.target.value : text);
    if (value.length <= maxLength) {
      setText(value);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <textarea
          value={text}
          onChange={handleChange}
          name=""
          id="message"
          placeholder="Write your text here..."
          className="textAreaStyle"
        ></textarea>
      </div>
    </>
  );
}

export default TextArea;
