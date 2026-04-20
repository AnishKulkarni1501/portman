import { useEffect, useState } from "react";
import API from "../api/api.js";
import StockCard from "../components/StockCard.js";

export default function Watchlist() {
  const [list, setList] = useState([]);
  const [symbol, setSymbol] = useState("");

  const userId = Number(localStorage.getItem("userId"));

  const load = async () => {
    const res = await API.get(`/watchlist/${userId}`);
    console.log("WATCHLIST DATA:", res.data);
    setList(res.data);
  };

  const add = async () => {
    await API.post("/watchlist/add", { symbol, userId });
    setSymbol("");
    load();
  };

  const remove = async (id) => {
    await API.delete(`/watchlist/${id}`);
    load();
  };

  useEffect(() => {
    if (userId) load();
  }, []);

  return (
    <div>
      <h2>Watchlist</h2>

      <input
        value={symbol}
        onChange={e => setSymbol(e.target.value)}
        placeholder="Enter symbol"
      />
      <button onClick={add}>Add</button>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {list.map(w => (
          <StockCard
            key={w.id}
            symbol={w.symbol}
            userId={userId}
            onRemove={() => remove(w.id)}
          />
        ))}
      </div>
    </div>
  );
}