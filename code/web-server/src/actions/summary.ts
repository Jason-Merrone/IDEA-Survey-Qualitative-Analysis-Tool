import { Report } from "@prisma/client";
import { Response } from "~/server";
import { createReport } from "~/server/db/queries/create";
import { getReport } from "~/server/db/queries/get";
import { getSummary } from "./ai";

export async function fetchOrGenerateSummary(pdfId: number): Promise<Response<Report>> {
    let report = (await getReport(pdfId)).data

    if (!report) {
        const summaryResponse = await getSummary(pdfId)
        if (!summaryResponse.data) {
            return { errors: summaryResponse.errors }
        } else {
            return createReport(
                pdfId,
                summaryResponse.data
            )
        }
    } else {
        return { data: report }
    }
}