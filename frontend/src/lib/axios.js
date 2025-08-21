import axios from 'axios'
import { BACKEND_URL } from '../constants/otherUrls.js'

export const axiosInstance = axios.create({
  // baseURL: BACKEND_URL + "/api",
  baseURL: import.meta.env.MODE === "development" ? (BACKEND_URL + 'api') : "/api",
  withCredentials: true,
  /* 
    axios will include cookies (and allow the browser to store them) on cross-site requests. 
    Use this if you’re doing cookie-based auth (HttpOnly JWT/session cookies).
  */
})