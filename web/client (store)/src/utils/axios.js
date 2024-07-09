import axios from "axios";

const axiosInstanceWithCredentials = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceWithCredentials.interceptors.request.use(
  (config) => {
    const data = JSON.parse(sessionStorage.getItem("user"));
    if (data) {
      config.headers["Authorization"] = `Bearer ${data.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export { axiosInstanceWithCredentials, axiosInstance };
