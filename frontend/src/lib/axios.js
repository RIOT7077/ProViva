import axios from "axios";
const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_LOCAL_BACKEND_URL || "http://localhost:5000/api",
  withCredentials: true, //browser will send cookies with every request to the backend
});
export default axiosInstance;
