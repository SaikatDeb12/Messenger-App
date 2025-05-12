import axios from "axios";

const axiosIns = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

export default axiosIns;
