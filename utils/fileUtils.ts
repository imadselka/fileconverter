import mammoth from "mammoth";
import { PDFDocument, StandardFonts } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";

export async function mergeFiles(
  files: File[],
  outputFormat: string,
  progressCallback: (progress: number) => void
): Promise<ArrayBuffer | Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  let mergedText = "";

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.type === "application/pdf") {
      // Merge PDF content
      const pdfBytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    } else if (
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // Extract text from DOCX files
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer: arrayBuffer });
      mergedText += result.value + "\n\n";
    } else if (file.type === "text/plain") {
      // Merge plain text
      const text = await file.text();
      mergedText += text + "\n\n";
    }

    // Update progress
    progressCallback(((i + 1) / files.length) * 100);
  }

  // If we have extracted text, convert it into a PDF and merge
  if (mergedText) {
    const textPdf = await PDFDocument.create();
    const page = textPdf.addPage();
    const font = await textPdf.embedFont(StandardFonts.Helvetica);
    page.drawText(mergedText, {
      x: 50,
      y: page.getHeight() - 50,
      font,
      size: 12,
    });
    const textPdfBytes = await textPdf.save();
    const copiedPages = await mergedPdf.copyPages(
      await PDFDocument.load(textPdfBytes),
      [0]
    );
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  // Handle different output formats (PDF, DOCX, TXT)
  if (outputFormat === "pdf") {
    return await mergedPdf.save();
  } else if (outputFormat === "docx" || outputFormat === "txt") {
    // Extract text from PDF for DOCX or TXT output using pdfjs-dist
    const pdfBytes = await mergedPdf.save();
    const extractedText = await extractTextFromPdf(pdfBytes);

    if (outputFormat === "docx") {
      // For DOCX, we're returning plain text (requires a proper DOCX generator for real-world usage)
      return new TextEncoder().encode(extractedText);
    } else {
      // Return plain text for TXT format
      return new TextEncoder().encode(extractedText);
    }
  }

  throw new Error("Unsupported output format");
}

// Utility function to extract text from a PDF using pdfjs-dist
async function extractTextFromPdf(pdfBytes: ArrayBuffer): Promise<string> {
  const pdfDoc = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
  let extractedText = "";

  for (let i = 0; i < pdfDoc.numPages; i++) {
    const page = await pdfDoc.getPage(i + 1);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(" ");
    extractedText += pageText + "\n\n";
  }

  return extractedText;
}
