const BACKEND_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "";

export {
  BACKEND_URL
}