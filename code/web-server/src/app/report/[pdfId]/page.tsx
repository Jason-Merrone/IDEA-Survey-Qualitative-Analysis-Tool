import Summary from "~/components/summary"
import "~/styles/globals.css";
import "~/styles/page.css";
import Card from '~/components/card';
import { getPdf } from "~/server/db/queries/get";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ pdfId: string }>
}) {
  const pdfId = parseInt((await params).pdfId)
  if (Number.isNaN(pdfId)) {
    return (<h1>Invalid PDF id</h1>)
  }

  const pdfResponse = await getPdf(pdfId)
  if (pdfResponse.errors || !pdfResponse.data) {
    return (<h1>Error retrieving PDF</h1>)
  }

  const pdf = pdfResponse.data

  return (
    <div>
      <div className='gradientBlock title roboto-bold'>Report</div>
      <div className='content roboto-regular'>
        <Card title="Summary" content={
          <Summary pdf={pdf}></Summary>
        }/>
      </div>
    </div>
  )
}
