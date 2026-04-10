import React, { useState } from "react";
import { addStock } from "../services/api";

function AddStock() {
  const [stock, setStock] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStock(stock);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Stock</h2>

      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="quantity" placeholder="Quantity" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddStock;