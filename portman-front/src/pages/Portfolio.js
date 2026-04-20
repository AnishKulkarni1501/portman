import { useEffect, useState } from "react";
import API from "../api/api.js";
import "../styles/Portfolio.css";

export default function Portfolio() {
  const [stocks, setStocks] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");

  const load = async () => {
    try {
      const res = await API.get(`/portfolio/${userId}`);
      setStocks(res.data);
    } catch {
      setMessage("Failed to load portfolio");
    }
  };

  const valid = symbol.trim() !== "" && qty > 0;

  const buy = async () => {
    if (!valid) return;

    setLoading(true);
    setMessage("");

    try {
      await API.post("/portfolio/buy", {
        symbol: symbol.toUpperCase(),
        quantity: Number(qty),
        userId: Number(userId)
      });

      setMessage("✅ Stock bought!");
      setSymbol("");
      setQty(1);
      load();
    } catch {
      setMessage("❌ Failed to buy stock");
    }

    setLoading(false);
  };

  const sell = async () => {
    if (!valid) return;

    setLoading(true);
    setMessage("");

    try {
      await API.post("/portfolio/sell", {
        symbol: symbol.toUpperCase(),
        quantity: Number(qty),
        userId: Number(userId)
      });

      setMessage("✅ Stock sold!");
      setSymbol("");
      setQty(1);
      load();
    } catch {
      setMessage("❌ Can't sell this amount");
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="portfolio-container">
      <div className="portfolio-card">

        <h2 className="portfolio-title">My Portfolio</h2>

        {message && (
          <div className={`message ${message.includes("❌") ? "error" : "success"}`}>
            {message}
          </div>
        )}

        <input
          className="portfolio-input"
          placeholder="Stock Symbol (AAPL)"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
        />

        <input
          className="portfolio-input"
          type="number"
          value={qty}
          min="1"
          onChange={e => setQty(e.target.value)}
        />

        <div className="portfolio-actions">
          <button
            className="buy-btn"
            onClick={buy}
            disabled={!valid || loading}
          >
            {loading ? "Processing..." : "Buy"}
          </button>

          <button
            className="sell-btn"
            onClick={sell}
            disabled={!valid || loading}
          >
            {loading ? "Processing..." : "Sell"}
          </button>
        </div>

        <div className="stock-list">
          {stocks.length === 0 ? (
            <p>No stocks yet</p>
          ) : (
            stocks.map(s => (
              <div className="stock-item" key={s.id}>
                <span>{s.symbol}</span>
                <span>{s.quantity}</span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}