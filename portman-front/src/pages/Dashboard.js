import { useState, useEffect, useCallback } from "react";
import API from "../api/api.js";
import "../styles/Dashboard.css";

export default function Dashboard() {

  const [symbol, setSymbol]   = useState("");
  const [stock, setStock]     = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (sym) => {
    if (!sym || sym.length < 1) return;
    try {
      setLoading(true);
      const res = await API.get(`/market/${sym.toUpperCase()}`);
      setStock({ ...res.data, symbol: sym.toUpperCase() });
    } catch {
      setStock(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search on type
  useEffect(() => {
    if (symbol.length < 1) {
      setStock(null);
      return;
    }

    const delay = setTimeout(() => fetchData(symbol), 500);
    return () => clearTimeout(delay);
  }, [symbol, fetchData]);

  // Poll every 15 sec after initial fetch
  useEffect(() => {
    if (!symbol) return;

    const interval = setInterval(() => fetchData(symbol), 15000);
    return () => clearInterval(interval);
  }, [symbol, fetchData]);

  const isIndian    = stock?.symbol?.endsWith(".NS");
  const currency    = isIndian ? "₹" : "$";
  const changeColor = stock?.change >= 0 ? "green" : "red";

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-title">🔍 Live Stock Search</h2>

      <input
        className="search-input"
        placeholder="AAPL / RELIANCE.NS"
        value={symbol}
        onChange={e => setSymbol(e.target.value)}
      />

      {loading && <p className="loading-text">Fetching...</p>}

      {stock && !loading && (
        <div className="stock-card">

          <h3 className="stock-symbol">{stock.symbol}</h3>

          <p className={`stock-price ${changeColor}`}>
            💰 {currency}{stock.price?.toFixed(2)}
          </p>

          <p className="stock-info">📈 High: {currency}{stock.high?.toFixed(2)}</p>
          <p className="stock-info">📉 Low: {currency}{stock.low?.toFixed(2)}</p>
          <p className="stock-info">🔓 Open: {currency}{stock.open?.toFixed(2)}</p>
          <p className="stock-info">📊 Prev Close: {currency}{stock.prevClose?.toFixed(2)}</p>

          <p className={`stock-change ${changeColor}`}>
            {stock.change >= 0 ? "▲" : "▼"} {(
              ((stock.price - stock.prevClose) / stock.prevClose) * 100
            ).toFixed(2)}%
          </p>

        </div>
      )}

    </div>
  );
}