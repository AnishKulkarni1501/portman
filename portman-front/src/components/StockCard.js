import { useEffect, useState } from "react";
import API from "../api/api.js";

export default function StockCard({ symbol, userId, onRemove }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/market/${symbol}`);
        setData(res.data);
      } catch (e) {
        console.log("Error loading stock");
      }
    };

    load();
  }, [symbol]);

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      margin: "10px",
      borderRadius: "10px",
      width: "200px"
    }}>
      <h3>{symbol}</h3>

      {data ? (
        <>
          <p>Price: {data.price}</p>

          <p style={{ color: data.change > 0 ? "green" : "red" }}>
            Previous Close: {data.prevClose}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={onRemove}>Remove</button>
    </div>
  );
}