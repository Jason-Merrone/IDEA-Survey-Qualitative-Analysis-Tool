import { split } from "postcss/lib/list";

const fs = require("fs");
const pdfParse = require("pdf-parse");

// Function to split text by punctuation followed by a newline character
function splitByPunctuation(text: string): string[] {
  // Regular expression for matching punctuation followed by a newline
  const regex = /[.!?]\n/;

  // Split the text based on the regex
  return text.split(regex).map((chunk) => chunk.trim());
}

// Function to read, convert the PDF, and split the text by keywords in order
export default async function convertPdfToText(file: File) {
  // Keywords to split the text by
  const keywords = [
    "Comments -",
    "What aspects of the teaching or content of this course do you feel were especially good? -",
    "What changes could be made to improve the teaching or the content on this course? -",
  ];

  try {
    // Use FileReader to read the file as an ArrayBuffer
    const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });

    const data = await pdfParse(arrayBuffer); // Parse the PDF data
    let pdfText = data.text;

    const splitText: string[] = [];
    // Loop over the keywords in order and split the text
    for (let keyword of keywords) {
      // Find the index of the current keyword
      const index = pdfText.indexOf(keyword);
      if (index !== -1) {
        // Split the text at the keyword and store the part before the keyword
        const part = pdfText.slice(0, index).trim();
        if (part) {
          splitText.push(part);
        }
        // Remove the split part and the keyword from the remaining text
        pdfText = pdfText.slice(index + keyword.length).trim();
      }
    }

    // Push the final remaining text after the last keyword
    if (pdfText) {
      splitText.push(pdfText);
    }

    splitText.shift(); // Ditch first chhunk of quantitative data

    const finalSplitText = splitText.flatMap((chunk) =>
      splitByPunctuation(chunk),
    );
    return finalSplitText;
  } catch (error) {
    console.error("Error parsing PDF:", error);
  }
}
