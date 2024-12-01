"use client";

import React, { useEffect, useState } from "react";
import Summary from "~/components/summary";
import Card from "~/components/card";
import UploadWithModal from "~/components/uploadModal";
import "~/styles/globals.css";
import "~/styles/page.css";
import { getReports, getReport } from "~/server/db/queries/get";

const DashboardPage = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [activeReport, setActiveReport] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    try {
      const reportResponse = await getReport(reportId);
      if (reportResponse.errors || !reportResponse.data) {
        setError("Failed to load report");
        return;
      }
      setActiveReport(reportResponse.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching report:", error);
      setError("Failed to load report");
    }
  };

  const handleBackToDashboard = () => {
    setActiveReport(null);
    setError(null);
  };

  return (
    <div>
      <div className="gradientBlock title roboto-bold">Dashboard</div>
      <div className="dashboard content roboto-regular">
        <UploadWithModal />
        {!activeReport ? (
          <div>
            <h2>Your Reports</h2>
            {error && <p>{error}</p>}
            <ul>
              {reports.map((report) => (
                <li key={report.id}>
                  <button onClick={() => handleViewReport(report.id)}>
                    View Report {report.id}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <button onClick={handleBackToDashboard}>Back to Dashboard</button>
            {error ? (
              <h1>{error}</h1>
            ) : (
              <Card title="Summary" content={<Summary pdf={activeReport} />} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
