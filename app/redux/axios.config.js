import axios from "axios";
const baseUrl = process?.env?.NEXT_PUBLIC_BASE_URL || "http://localhost:4040";
axios.defaults.baseURL = baseUrl;

export default axios;
