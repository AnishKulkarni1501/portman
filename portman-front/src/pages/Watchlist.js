import { useEffect, useState } from "react";
import API from "../api/api.js";
import StockCard from "../components/StockCard.js";
import "../styles/Watchlist.css";

export default function Watchlist() {
  const [list, setList] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userId = Number(localStorage.getItem("userId"));

  const load = async () => {
    try {
      const res = await API.get(`/watchlist/${userId}`);
      setList(res.data);
    } catch {
      setError("Failed to load watchlist");
    }
  };

  const valid = symbol.trim() !== "";

  const add = async () => {
    if (!valid) return;

    setLoading(true);
    setError("");

    try {
      await API.post("/watchlist/add", {
        symbol: symbol.toUpperCase(),
        userId
      });

      setSymbol("");
      load();
    } catch {
      setError("Failed to add stock");
    }

    setLoading(false);
  };

  const remove = async (id) => {
    try {
      await API.delete(`/watchlist/${id}`);
      load();
    } catch {
      setError("Failed to remove stock");
    }
  };

  useEffect(() => {
    if (userId) load();
  }, [userId]);

  return (
    <div className="watchlist-container">
      <div className="watchlist-card">

        <h2 className="watchlist-title">⭐ Watchlist</h2>

        {error && (
          <div className="watchlist-message error">
            {error}
          </div>
        )}

        <div className="watchlist-input-group">
          <input
            className="watchlist-input"
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
            placeholder="Enter symbol (AAPL)"
          />

          <button
            className="add-btn"
            onClick={add}
            disabled={!valid || loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {list.length === 0 ? (
          <div className="empty">No stocks in your watchlist</div>
        ) : (
          <div className="watchlist-grid">
            {list.map(w => (
              <StockCard
                key={w.id}
                symbol={w.symbol}
                userId={userId}
                onRemove={() => remove(w.id)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}