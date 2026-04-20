import { useEffect, useState } from "react";
import API from "../api/api.js";
import Notification from "./Notification.js";
import Performance from "./Performance.js";
import "../styles/Report.css";

export default function Report() {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadReport = async () => {
      try {
        const res = await API.get(`/report/${userId}`);
        setReport(res.data);
      } catch {
        setError("Failed to load report");
      }
      setLoading(false);
    };

    loadReport();
  }, [userId]);

  return (
    <div className="report-container">
      <div className="report-card">

        <h2 className="report-title">📊 Portfolio Report</h2>

        {loading && (
          <div className="report-message loading">
            Loading report...
          </div>
        )}

        {error && (
          <div className="report-message error">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="report-content">
            {report || "No report data available"}
          </div>
        )}

        <div className="report-section">
          <Performance />
        </div>

        <div className="report-section">
          <Notification />
        </div>

      </div>
    </div>
  );
}