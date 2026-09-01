import html2pdf from "html2pdf.js";

export function exportAsPdf(canvasElement: HTMLElement, title = "document") {
  const options = {
    margin: 0.5,
    filename: `${title}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  } as const;

  html2pdf().set(options).from(canvasElement).save();
}
