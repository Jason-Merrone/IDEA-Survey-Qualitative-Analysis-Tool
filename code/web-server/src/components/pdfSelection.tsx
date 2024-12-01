"use client";

import React, { useState, useEffect } from "react";
import { getUserPdfs } from "~/server/db/queries/get";

interface PDFSelectionProps {
  onPdfSelect: (pdfId: number) => void;
}

const PDFSelection: React.FC<PDFSelectionProps> = ({ onPdfSelect }) => {
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPdfs() {
      const response = await getUserPdfs("user-aNumber"); // Pass the aNumber dynamically as needed
      if (response.errors) {
        setError("Failed to fetch PDFs");
        return;
      }
      setPdfs(response.data || []);
    }

    fetchPdfs();
  }, []);

  return (
    <div>
      <h3>Select a PDF</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {pdfs.map((pdf) => (
          <li key={pdf.id}>
            <button onClick={() => onPdfSelect(pdf.id)}>{pdf.pdfName}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PDFSelection;
