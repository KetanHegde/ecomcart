import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productAPI = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
};

export const cartAPI = {
  getCart: (userId = "guest") => api.get(`/cart?userId=${userId}`),
  addToCart: (productId, quantity = 1, userId = "guest") =>
    api.post("/cart", { productId, quantity, userId }),
  updateItem: (itemId, quantity, userId = "guest") =>
    api.put(`/cart/${itemId}`, { quantity, userId }),
  removeItem: (itemId, userId = "guest") =>
    api.delete(`/cart/${itemId}?userId=${userId}`),
  clearCart: (userId = "guest") => api.delete(`/cart?userId=${userId}`),
};

export const checkoutAPI = {
  processCheckout: (data) => api.post("/checkout", data),
};

export default api;
