import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll("filepond");

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[0];
    if (uploadedFile instanceof File) {
      const fileName = uuidv4();
      const tempFilePath = `/tmp/${fileName}.pdf`;
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

      await fs.writeFile(tempFilePath, fileBuffer);

      const parsedText = await new Promise<string>((resolve, reject) => {
        const pdfParser = new (PDFParser as any)(null, 1);

        pdfParser.on("pdfParser_dataError", (errData: any) =>
          reject(errData.parserError),
        );
        pdfParser.on("pdfParser_dataReady", () => {
          resolve((pdfParser as any).getRawTextContent());
        });

        pdfParser.loadPDF(tempFilePath);
      });

      return NextResponse.json({ fileName, parsedText });
    } else {
      console.log("Uploaded file is not in the expected format.");
      return NextResponse.json({ error: "Invalid file format" });
    }
  } else {
    console.log("No files found.");
    return NextResponse.json({ error: "No files uploaded" });
  }
}
