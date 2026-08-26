import { saveEditorSnapshot } from "./saveEditorSnapshot";

export function insertImage(
  url: string,
  altText: string,
  savedRange: Range,
  onUpdate: (content: string) => void,
) {
  const container = savedRange.commonAncestorContainer;
  const containerElement =
    container.nodeType === Node.ELEMENT_NODE
      ? (container as Element)
      : container.parentElement;
  const editableElement = containerElement?.closest<HTMLElement>(
    "[contenteditable='true']",
  );

  if (!editableElement) {
    return;
  }

  let imageSource = url.trim();

  if (imageSource.startsWith("data:image/")) {
    if (!/^data:image\/[a-z0-9.+-]+;base64,[a-z0-9+/=]+$/i.test(imageSource)) {
      alert("This image data is not valid.");
      return;
    }
  } else {
    let parsedUrl: URL;

    try {
      parsedUrl = new URL(imageSource);
    } catch {
      alert("Please enter a valid image URL.");
      return;
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      alert("This image URL type is not allowed.");
      return;
    }

    imageSource = parsedUrl.toString();
  }

  saveEditorSnapshot();

  const image = document.createElement("img");
  image.src = imageSource;
  image.alt = altText.trim();
  image.className = "editorImage";
  image.contentEditable = "false";

  savedRange.deleteContents();
  savedRange.insertNode(image);

  const spacer = document.createTextNode(" ");
  image.after(spacer);

  const selection = window.getSelection();
  if (selection) {
    const caretRange = document.createRange();
    caretRange.setStart(spacer, spacer.length);
    caretRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(caretRange);
  }

  onUpdate(editableElement.innerHTML);
}
