import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});
// ── Auto-attach JWT token to every request ──────────
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// ── Public routes ───────────────────────────────────
export const getGames    = ()       => API.get("/games");
export const getReviews  = (gameId) => API.get(`/reviews/${gameId}`);
export const addReview   = (data)   => API.post("/reviews", data);
export const sendContact = (data)   => API.post("/contact", data);
export const getCategories  = ()         => API.get("/categories");
export const getPlatforms  = ()       => API.get("/platforms");
// ── Auth routes ─────────────────────────────────────
export const loginAdmin  = (data)   => API.post("/auth/login", data);
export const getMe       = ()       => API.get("/auth/me");
export const logoutAdmin = ()       => API.post("/auth/logout");
// ── Admin — Games ───────────────────────────────────
export const createGame  = (data)   => API.post("/games", data);
export const updateGame  = (id, data) => API.put(`/games/${id}`, data);
export const deleteGame  = (id)     => API.delete(`/games/${id}`);

// ── Admin — Categories ──────────────────────────────
export const createCategory = (data)     => API.post("/categories", data);
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);
export const deleteCategory = (id)       => API.delete(`/categories/${id}`);

// ── Admin — Platforms ───────────────────────────────

export const createPlatform = (data)     => API.post("/platforms", data);
export const updatePlatform = (id, data) => API.put(`/platforms/${id}`, data);
export const deletePlatform = (id)       => API.delete(`/platforms/${id}`);

// ── Admin — Reviews ─────────────────────────────────
export const getAllReviews = ()   => API.get("/reviews");
export const deleteReview = (id) => API.delete(`/reviews/${id}`);

// ── Admin — Stats ────────────────────────────────────
export const getStats = () => API.get("/stats");
export const deleteContact = (id) => API.delete(`/contact/${id}`);