import { PdfTextLine } from "@prisma/client";
import { Response } from "~/server";

export async function getPdfTextLines(
    pdfId: number
  ): Promise<Response<{ textLines: PdfTextLine[] }>> {
    return {
        data: {
            textLines: [
                {
                    id: 34,
                    aNumber: "A02341136",
                    lineText: "",
                    lineNumber: 12,
                    pdfId: 1
                }
            ]
        }
    }
  }