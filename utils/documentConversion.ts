import { Document, Packer, Paragraph, TextRun } from "docx";
import { PDFDocument, rgb } from "pdf-lib";

export async function convertDocumentToFormat(
  file: File,
  outputFormat: string
): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();

  switch (outputFormat) {
    case "pdf":
      return convertToPdf(arrayBuffer);
    case "docx":
      return convertToDocx(arrayBuffer);
    case "txt":
      return convertToTxt(arrayBuffer);
    default:
      throw new Error("Unsupported output format");
  }
}

async function convertToPdf(arrayBuffer: ArrayBuffer): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();
  const fontSize = 12;

  const text = new TextDecoder().decode(arrayBuffer);
  page.drawText(text, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}

async function convertToDocx(arrayBuffer: ArrayBuffer): Promise<Blob> {
  const text = new TextDecoder().decode(arrayBuffer);
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(text)],
          }),
        ],
      },
    ],
  });

  const docxBuffer = await Packer.toBuffer(doc);
  return new Blob([docxBuffer], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}

async function convertToTxt(arrayBuffer: ArrayBuffer): Promise<Blob> {
  const text = new TextDecoder().decode(arrayBuffer);
  return new Blob([text], { type: "text/plain" });
}
