
import React, { useEffect, useState } from "react";
import { getStocks, deleteStock } from "../services/api";
import EditStock from "./EditStock";

function StockList() {
  const [stocks, setStocks] = useState([]);
  const [editStock, setEditStock] = useState(null);

  const loadStocks = async () => {
    const data = await getStocks();
    setStocks(data);
  };

  useEffect(() => {
    loadStocks();
  }, []);

  return (
    <div>
      <h2>Stock List</h2>

      {editStock && (
        <EditStock stock={editStock} refresh={loadStocks} />
      )}

      <ul>
        {stocks.map((s) => (
          <li key={s.id}>
            {s.name} - Qty: {s.quantity} - ₹{s.price}

            <button onClick={() => setEditStock(s)}>Edit</button>

            <button onClick={() => {
              deleteStock(s.id);
              loadStocks();
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StockList;