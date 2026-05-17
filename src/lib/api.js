import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

const adminHeaders = { headers: { Authorization: "Bearer admin123" } };

export const getProducts = () => api.get("/products");
export const getProductById = (id) => api.get(`/products/${id}`);
export const getProductsAdmin = () => api.get("/products", adminHeaders);
export const createProduct = (data) =>
  api.post("/products", data, adminHeaders);
export const updateProduct = (id, data) =>
  api.put(`/products/${id}`, data, adminHeaders);
export const deleteProduct = (id) =>
  api.delete(`/products/${id}`, adminHeaders);

export const submitQuote = (data) => api.post("/quotes", data);
export const verifyQuote = (data) => api.post("/quotes/verify", data);
export const getAdminQuotes = () => api.get("/quotes/admin", adminHeaders);

export const updateQuoteStatus = (id, status) =>
  api.put(`/quotes/${id}/status`, { status }, adminHeaders);

export const deleteQuote = (id) => api.delete(`/quotes/${id}`, adminHeaders);

export const submitContact = (data) => api.post("/contacts", data);
export const verifyContact = (data) => api.post("/contacts/verify", data);
export const getAdminContacts = () => api.get("/contacts/admin", adminHeaders);

export const updateContact = (id, data) =>
  api.put(`/contacts/${id}`, data, adminHeaders);

export const deleteContact = (id) =>
  api.delete(`/contacts/${id}`, adminHeaders);

export const loginAdmin = (credentials) => api.post("/admin/login", credentials);

export const createOrder = (data) => api.post("/orders", data);
export const getAdminOrders = () => api.get("/orders/admin", adminHeaders);
export const updateOrderStatus = (id, data) => api.put(`/orders/${id}/status`, data, adminHeaders);
export const deleteOrder = (id) => api.delete(`/orders/${id}`, adminHeaders);

export default api;
