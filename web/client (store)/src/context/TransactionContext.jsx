import axios from "axios";
import React, { createContext, useState } from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/transaction`, data);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const updateTransaction = async (data) => {
    try {
      const response = await axiosInstance.post(`/midtrans/notification`, data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const fetchAllTransactions = async (page, limit) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/transaction`, {
        params: {
          page,
          limit,
        },
      });
      const datas = await response.data;
      setTransactions(datas.data.transactions);
      setTotalPages(datas.data.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  return <TransactionContext.Provider value={{ createTransaction, updateTransaction, fetchAllTransactions, transactions, loading, page, totalPages, setPage }}>{children}</TransactionContext.Provider>;
};
