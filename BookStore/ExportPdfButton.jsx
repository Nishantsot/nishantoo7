// src/ExportPdfButton.jsx
import React from "react";
import jsPDF from "jspdf";

function ExportPdfButton({ books, title = "Book List" }) {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(title, 10, 10);

    let y = 20;
    books.forEach((book, index) => {
      const info = book.volumeInfo;
      doc.text(`${index + 1}. ${info.title || "Untitled"}`, 10, y);
      y += 7;
      if (info.authors) {
        doc.text(`   Author: ${info.authors.join(", ")}`, 10, y);
        y += 7;
      }
      if (info.publishedDate) {
        doc.text(`   Published: ${info.publishedDate}`, 10, y);
        y += 7;
      }
      y += 3;

      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save(`${title.replace(" ", "_")}.pdf`);
  };

  return (
    <button className="btn btn-outline-success btn-sm mb-3" onClick={handleExport}>
      📄 Export as PDF
    </button>
  );
}

export default ExportPdfButton;
