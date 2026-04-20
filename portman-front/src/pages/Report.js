import { useEffect, useState } from "react";
import API from "../api/api.js";
import Notification from "./Notification.js";
import Performance from "./Performance.js";
export default function Report() {
  const [report, setReport] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    API.get(`/report/${userId}`).then(res => setReport(res.data));
  }, []);

  return (
    <div>
      <h2>Report</h2>
      <pre>{report}</pre>
      <Performance />
      <Notification />
    </div>
  );
}