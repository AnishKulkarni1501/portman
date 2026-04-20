import { useEffect, useState } from "react";
import API from "../api/api.js";

export default function Performance() {
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const load = async () => {
      const res = await API.get(`/performance/${userId}`);
      setData(res.data);
    };

    load();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h3>Performance</h3>

      <p style={{ color: "green" }}>
        Best: {(data.best_performer * 100).toFixed(2)}%
      </p>

      <p style={{ color: "red" }}>
        Worst: {(data.worst_performer * 100).toFixed(2)}%
      </p>
    </div>
  );
}