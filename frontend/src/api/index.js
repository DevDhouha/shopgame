import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

export const getGames    = ()       => API.get("/games");
export const getReviews  = (gameId) => API.get(`/reviews/${gameId}`);
export const addReview   = (data)   => API.post("/reviews", data);
export const sendContact = (data)   => API.post("/contact", data);
