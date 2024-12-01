"use client";
import { Pdfs } from "@prisma/client";
import { useEffect, useState } from "react";
import { fetchOrGenerateSummary } from "~/actions/summary";
import { LoadingBars } from "./loading";

interface SummaryProps {
  pdf: Pdfs | null;
}

const Summary = ({ pdf }: SummaryProps) => {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    populateSummary()
  }, []);

  async function populateSummary() {
    if (!pdf) {
      setError("No PDF selected.");
      setLoading(false);
      return;
    }

    const reportResponse = await fetchOrGenerateSummary(pdf.id)
    if (reportResponse.data) {
      setSummary(reportResponse.data.summaryText)
      setLoading(false)
    } else {
      setError("Unable to fetch summary.")
      setLoading(false)
    }
  }

  if (loading) return <LoadingBars />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <p>Summary of: {pdf?.pdfName}</p>
      <p>{summary}</p>
    </div>
  );
};

export default Summary;
