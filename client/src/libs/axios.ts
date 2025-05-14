import axios from "axios";
// import "dotenv/config";
const axiosIns = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export default axiosIns;
