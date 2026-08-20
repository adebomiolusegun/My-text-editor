import { useEditorStore } from "@store/TextEditorStore/TextEditorStore";

function Footer() {
  const blocks = useEditorStore((state) => state.blocks);

  const html = blocks.map((block) => block.content).join(" ");

  const text = htmlToText(html);

  const characters = text.length;

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="footerStyle">
      <div>
        <p>Number of characters: {characters}</p>
      </div>

      <div>
        <p>Number of words: {words}</p>
      </div>
    </div>
  );
}

function htmlToText(html: string) {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");

  return document.body.textContent || "";
}

export default Footer;
