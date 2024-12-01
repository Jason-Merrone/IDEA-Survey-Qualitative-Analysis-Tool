// UploadInput.tsx
import React, { useState } from "react";
import extractTextFromPDF from "pdf-parser-client-side";
import { createPdf } from "~/server/db/queries/create";

interface UploadInputProps {
  closeModal: () => void; // Add closeModal as a prop
}

export default function UploadInput({ closeModal }: UploadInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const keywords = [
    "Comments -",
    "What aspects of the teaching or content of this course do you feel were especially good? -",
    "What changes could be made to improve the teaching or the content on this course? -",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    try {
      let pdfText = await extractTextFromPDF(selectedFile, "clean");
      if (!pdfText) {
        console.error("Error extracting text from PDF.");
        return;
      }

      const splitText: string[] = [];
      for (const keyword of keywords) {
        const index = pdfText.indexOf(keyword);
        if (index !== -1) {
          const part = pdfText.slice(0, index).trim();
          if (part) {
            splitText.push(part);
          }
          pdfText = pdfText.slice(index + keyword.length).trim();
        }
      }

      if (pdfText) {
        splitText.push(pdfText);

        const pdfName = selectedFile.name.split(".")[0] || "Unnamed PDF";
        const schoolYear = "";
        const className = "";
        const section = "";

        splitText.shift();
        const finalSplitText = splitText.flatMap((chunk) =>
          splitByPunctuation(chunk)
        );

        console.log("Extracted Text:", finalSplitText);
        const response = await createPdf(
          pdfName,
          schoolYear,
          className,
          section,
          finalSplitText
        );

        if (!response.data) {
          console.error("Error creating PDF:", response.errors);
          return;
        }

        console.log("PDF created with ID:", response.data.id);
      }

      // Close the modal after successful submission
      closeModal();
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        id="file-selector"
      />
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
}

function splitByPunctuation(text: string): string[] {
  const regex = /[.!?]\s/;
  return text.split(regex).map((chunk) => chunk.trim());
}
