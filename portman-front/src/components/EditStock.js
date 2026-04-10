import React, { useState } from "react";
import { updateStock } from "../services/api";

function EditStock({ stock, refresh }) {
  const [form, setForm] = useState(stock);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await updateStock(stock.id, form);
    refresh();
  };

  return (
    <div>
      <h3>Edit Stock</h3>

      <input name="name" value={form.name} onChange={handleChange} />
      <input name="quantity" value={form.quantity} onChange={handleChange} />
      <input name="price" value={form.price} onChange={handleChange} />

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditStock;