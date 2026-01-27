import { useTextAreaStore } from "@store/TextAreaStore";

function Footer() {
  const text = useTextAreaStore((state) => state.textAreaContent);
  return (
    <div className="footerStyle">
      <div>
        <p>Number of characters: {text.length}</p>
      </div>

      <div>
        <p>
          Number of words: {text.trim().split(/\s+/).filter(Boolean).length}
        </p>
      </div>
    </div>
  );
}

export default Footer;
