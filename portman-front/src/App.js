import React from "react";
import StockList from "./components/Stocklist";
import AddStock from "./components/AddStock";

function App() {
  return (
    <div>
      <h1>Stock Management System</h1>
      <AddStock />
      <StockList />
    </div>
  );
}

export default App;