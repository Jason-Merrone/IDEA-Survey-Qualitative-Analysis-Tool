"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UploadWithModal from "~/components/uploadModal";
import "~/styles/globals.css";
import "~/styles/page.css";
import { getUserPdfs } from "~/server/db/queries/get";
import { getUserSession } from "~/actions/session";
import { Pdfs } from "@prisma/client";

const DashboardPage = () => {
  const router = useRouter();
  const [pdfs, setPDFs] = useState<Pdfs[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserOrRedirect = async () => {
      const user = await getUserSession();
      if (!user) {
        router.push("/login");
      }
    };
    void fetchUserOrRedirect();
  });

  // Fetch reports on load
  useEffect(() => {
    const fetchPDFs = async () => {
      const user = await getUserSession(); // Fetch user session dynamically
      if (!user) {
        console.error("User not logged in");
        return;
      }
      const pdfResponse = await getUserPdfs(user.aNumber);
      if (pdfResponse.errors || !pdfResponse.data) {
        setError("Failed to load reports");
        return;
      }
      setPDFs(pdfResponse.data);
    };

    fetchPDFs();
  }, []);

  const handleViewReport = async (pdfId: number) => {
    router.push(`/report/${pdfId}`);
  };

  const onPdfUploadSuccess = (pdf: Pdfs) => {
    setPDFs([...pdfs, pdf])
  }

  return (
    <div>
      <div className="gradientBlock title roboto-bold">Dashboard</div>
      <div className="dashboard content roboto-regular">
        <UploadWithModal onPdfUploadSuccess={onPdfUploadSuccess} />
        <div>
          <h2>Your Reports</h2>
          {error && <p>{error}</p>}
          <ul>
            {pdfs.map((pdf) => (
              <li key={pdf.id}>
                <button
                  className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  onClick={() => handleViewReport(pdf.id)}
                >
                  View Report for {pdf.class} {pdf.schoolYear}-{pdf.section}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
