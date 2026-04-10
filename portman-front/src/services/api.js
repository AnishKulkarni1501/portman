const BASE_URL = "http://localhost:8080/api/markets";

export const getStocks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addStock = async (stock) => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stock),
  });
};

export const updateStock = async (id, stock) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stock),
  });
};

export const deleteStock = async (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};