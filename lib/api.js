import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-tracker-backend-thhy.onrender.com/api/",
});

export default api;

