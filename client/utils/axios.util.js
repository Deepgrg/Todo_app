import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  timeout: 100000,
  headers: { "Content-Type": "application/json" },
});

export default instance;
