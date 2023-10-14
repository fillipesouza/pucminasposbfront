import axios from "axios";
const BASE_URL = "https://g1j5wrxrz8.execute-api.us-east-1.amazonaws.com/prod/mgsense";
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
});
export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", "Accept": "application/json" },
});