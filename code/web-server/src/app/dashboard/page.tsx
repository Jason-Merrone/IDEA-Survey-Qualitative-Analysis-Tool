"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UploadWithModal from "~/components/uploadModal";
import "~/styles/globals.css";
import "~/styles/page.css";
import { getReports } from "~/server/db/queries/get";
import { getUserSession } from "~/actions/session";

const DashboardPage = () => {
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
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
    const fetchReports = async () => {
      const reportResponse = await getReports();
      if (reportResponse.errors || !reportResponse.data) {
        setError("Failed to load reports");
        return;
      }
      setReports(reportResponse.data);
    };

    fetchReports();
  }, []);

  const handleViewReport = async (reportId: number) => {
    router.push(`/report/${reportId}`);
  };

  return (
    <div>
      <div className="gradientBlock title roboto-bold">Dashboard</div>
      <div className="dashboard content roboto-regular">
        <UploadWithModal />
        <div>
          <h2>Your Reports</h2>
          {error && <p>{error}</p>}
          <ul>
            {reports.map((report) => (
              <li key={report.id}>
                <button
                  className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  onClick={() => handleViewReport(report.id)}
                >
                  View Report {report.id}
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
