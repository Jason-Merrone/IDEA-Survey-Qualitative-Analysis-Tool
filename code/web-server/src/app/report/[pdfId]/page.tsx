import Report from "~/components/Report";
import "~/styles/globals.css";
import "~/styles/page.css";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ pdfId: string }>
}) {
  const pdfId = parseInt((await params).pdfId)
  if (Number.isNaN(pdfId)) {
    return (<h1>Invalid PDF id</h1>)
  }

  return (<Report pdfId={pdfId}/>)
}
