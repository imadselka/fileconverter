import { PDFDocument } from "pdf-lib";

self.onmessage = async (e) => {
  const { pdfBytes } = e.data;
  const pdfDoc = await PDFDocument.load(pdfBytes);
  let extractedText = "";

  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    const text = await page.getText();
    extractedText += text + "\n\n";

    self.postMessage({ progress: ((i + 1) / pdfDoc.getPageCount()) * 100 });
  }

  self.postMessage({ result: new TextEncoder().encode(extractedText) });
};
