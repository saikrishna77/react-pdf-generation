import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
const PdfAnnotator2 = () => {
  const base64Data = `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CFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdrfjc0jmtGCDu6dFw4nD4NtwLAy6v1V4AtsIpwteZ3Q+O4ZoSwo0vHhcPp03ArALy8Wn8F2AKrCFdL/r+/3C+PU7UsDQplbmRzdHJlYW0KZW5kb2JqCjkgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iagoxMCAwIG9iago8PAovVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTEKL0Jhc2VGb250IC9IZWx2ZXRpY2EtQm9sZAovRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZwo+PgplbmRvYmoKMTEgMCBvYmoKPDwKL0JpdHNQZXJDb21wb25lbnQgOAovUHJlZGljdG9yIDE1Ci9Db2x1bW5zIDEyMAovQ29sb3JzIDMKPj4KZW5kb2JqCjEyIDAgb2JqCjw8Ci9CaXRzUGVyQ29tcG9uZW50IDgKL1ByZWRpY3RvciAxNQovQ29sdW1ucyAxMTEKL0NvbG9ycyAzCj4+CmVuZG9iagp4cmVmCjAgMTMKMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDAwMDE1IDAwMDAwIG4NCjAwMDAwMDAwNzggMDAwMDAgbg0KMDAwMDAwMDEzNSAwMDAwMCBuDQowMDAwMDAwMjU0IDAwMDAwIG4NCjAwMDAwMDIwNzQgMDAwMDAgbg0KMDAwMDAwMjE0NCAwMDAwMCBuDQowMDAwMDAyMTg2IDAwMDAwIG4NCjAwMDAwMDQxMzIgMDAwMDAgbg0KMDAwMDAwNTA0NCAwMDAwMCBuDQowMDAwMDA1MTQxIDAwMDAwIG4NCjAwMDAwMDUyNDQgMDAwMDAgbg0KMDAwMDAwNTMyMyAwMDAwMCBuDQp0cmFpbGVyCjw8Ci9Sb290IDEgMCBSCi9JRCBbPEMwMkExNTY3NkYzNDU4MzhGRkI5NEJDQURGOUE1QzNDPiA8QzAyQTE1Njc2RjM0NTgzOEZGQjk0QkNBREY5QTVDM0M+XQovU2l6ZSAxMwo+PgpzdGFydHhyZWYKNTQwMgolJUVPRgo=`;

  const [annotatedPdfUrl, setAnnotatedPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(null);

  const annotatePdf = async () => {
    // Decode the base64 string
    const pdfBytes = Uint8Array.from(atob(base64Data), (char) =>
      char.charCodeAt(0)
    );

    // Load the PDFDocument
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawRectangle({
      x: 150,
      y: 750, // 200 units from the top
      width: 200,
      height: 100,

      color: rgb(1, 1, 1),
      opacity: 1, // 50% opacity
    });
    firstPage.drawText("E-way Bill", {
      x: 20,
      y: 770,
      size: 14,
    });
    firstPage.drawRectangle({
      x: 250,
      y: -25, // 200 units from the top
      width: 100,
      height: 50,

      color: rgb(1, 1, 1),
      opacity: 1, // 50% opacity
    });
    // Serialize the PDFDocument to bytes
    const pdfBytesNew = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytesNew], { type: "application/pdf" });

    // Create a URL for the annotated PDF
    const url = URL.createObjectURL(pdfBlob);
    setAnnotatedPdfUrl(url);
  };

  return (
    <div>
      <button onClick={annotatePdf}>Annotate PDF</button>
      {annotatedPdfUrl && (
        <>
          <Document
            file={annotatedPdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
          <a href={annotatedPdfUrl} download="annotated.pdf">
            Download Annotated PDF
          </a>
        </>
      )}
    </div>
  );
};

export default PdfAnnotator2;
