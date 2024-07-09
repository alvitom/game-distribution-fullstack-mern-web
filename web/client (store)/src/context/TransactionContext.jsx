import React, { createContext, useState } from "react";
import { createTransactionUser, fetchAllTransactionUser, updateTransactionUser } from "../api/transaction";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const createTransaction = async (data) => {
    try {
      setLoading(true);
      const response = await createTransactionUser(data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const updateTransaction = async (data) => {
    try {
      setLoading(true);
      const response = await updateTransactionUser(data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const getAllTransactions = async (page, limit) => {
    try {
      setLoading(true);
      const response = await fetchAllTransactionUser(page, limit);
      const data = await response.data;
      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  return <TransactionContext.Provider value={{ createTransaction, updateTransaction, getAllTransactions, transactions, loading, page, totalPages, setPage }}>{children}</TransactionContext.Provider>;
};
