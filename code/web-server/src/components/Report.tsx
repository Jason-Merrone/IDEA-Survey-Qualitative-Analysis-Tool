"use client"
import { Pdfs, PdfTextLine } from "@prisma/client"
import { useEffect, useState } from "react"
import { getSemantic } from "~/actions/ai"
import { getPdfWithAllComments } from "~/server/db/queries/get"
import AttributePie from "./AttributePie"
import { Error } from "~/server"
import Comments from "./Comments"
import "~/styles/Report.css"
import "~/styles/markdown.css"
import ReactMarkdown from "react-markdown"
import { fetchOrGenerateSummary } from "~/actions/summary"
import { LoadingBars } from "./loading"

interface ReportProps {
    pdfId: number
}

const LoadingCard = () => {
    return (
        <div className="loading-card">
            <LoadingBars />
        </div>
    )
}

const Report = ({ pdfId }: ReportProps) => {
    const [pdf, setPDF] = useState<Pdfs>()
    const [comments, setComments] = useState<PdfTextLine[]>()
    const [summary, setSummary] = useState<string>()
    const [errors, setErrors] = useState<Error[]>()

    const loadPDF = async () => {
        const pdfResponse = await getPdfWithAllComments(pdfId)
        if (pdfResponse.errors) {
            setPDF(undefined)
            setComments(undefined)
            setErrors(pdfResponse.errors)
        } else if (pdfResponse.data) {
            setPDF(pdfResponse.data)
            setComments(pdfResponse.data.pdfText)
            setErrors(pdfResponse.errors)
        }
    }

    const populateSummary = async () => {
        if (!pdf) return
    
        const reportResponse = await fetchOrGenerateSummary(pdf.id)
        if (reportResponse.data) {
            setSummary(reportResponse.data.summaryText)
        }
      }

    useEffect(() => {
        loadPDF()
    }, [])

    useEffect(() => {
        populateSummary()
    }, [pdf])

    useEffect(() => {
        let cancelled = false

        const populateCommentAttributes = async () => {
            if (comments) {
                for (const comment of comments) {
                    if (cancelled || !summary) return
                    if (!comment.attribute) {
                        const semanticResponse = await getSemantic(comment.id)
                        if (semanticResponse.data) {
                            comment.attribute = semanticResponse.data
                            setComments(comments?.map((a) => a.id == comment.id ? comment : a))
                        }
                    }
                }
            }
        }

        populateCommentAttributes()
        return () => { cancelled = true }
    }, [pdf, summary])

    return (
        <div>
            <div className='gradientBlock title roboto-bold'>Report</div>
            <div className='roboto-regular report-layout-row'>
                <div className="report-layout-col left-pane">
                    <div className="report-card">
                        <h3>Summary</h3>
                        {(summary ? <ReactMarkdown className="markdown">{summary}</ReactMarkdown> : <LoadingCard />)}
                    </div>
                </div>
                <div className="report-layout-col right-pane">
                    <div className="report-card pie-chart">
                        <h3>Attribute Breakdown</h3>
                        {(comments && summary ? <AttributePie comments={comments} /> : <LoadingCard />)}
                    </div>
                    <div className="report-card comments">
                        <h3>Comments</h3>
                        {(comments ? <Comments comments={comments} /> : <LoadingCard />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report