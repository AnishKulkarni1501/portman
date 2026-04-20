import { useState, useEffect } from "react";
import API from "../api/api.js";
import "../styles/Dashboard.css";

export default function Dashboard() {

  const [symbol, setSymbol] = useState("");
  const [stock, setStock] = useState(null);

  useEffect(() => {

    if (symbol.length < 1) {
      setStock(null);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await API.get(`/market/${symbol.toUpperCase()}`);

        setStock({
          ...res.data,
          symbol: symbol.toUpperCase()
        });

      } catch {
        setStock(null);
      }
    }, 500);

    return () => clearTimeout(delay);

  }, [symbol]);

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">🔍 Live Stock Search</h2>

      <input
        className="search-input"
        placeholder="Type stock (AAPL)"
        value={symbol}
        onChange={e => setSymbol(e.target.value)}
      />

      {stock && (
        <div className="stock-card">

          <h3 className="stock-symbol">{stock.symbol}</h3>

          <p className={`stock-price ${
            stock.price > stock.prevClose ? "green" : "red"
          }`}>
            💰 ₹{stock.price}
          </p>

          <p className="stock-info">📈 High: ₹{stock.high}</p>
          <p className="stock-info">📉 Low: ₹{stock.low}</p>
          <p className="stock-info">🔓 Open: ₹{stock.open}</p>
          <p className="stock-info">📊 Prev Close: ₹{stock.prevClose}</p>

          <p className="stock-change">
            📊 Change: {(
              ((stock.price - stock.prevClose) / stock.prevClose) * 100
            ).toFixed(2)}%
          </p>

        </div>
      )}

    </div>
  );
}