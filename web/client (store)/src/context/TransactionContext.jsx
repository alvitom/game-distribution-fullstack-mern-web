import axios from "axios";
import React, { createContext } from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  axiosInstance.interceptors.request.use(
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

  const createTransaction = async (data) => {
    try {
      const response = await axiosInstance.post(`/transaction`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  return <TransactionContext.Provider value={{ createTransaction }}>{children}</TransactionContext.Provider>;
};
