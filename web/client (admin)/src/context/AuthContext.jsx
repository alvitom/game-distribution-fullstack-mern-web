import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const limit = 10;

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_DEV,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
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

  const login = async (userData) => {
    try {
      const response = await axiosInstance.post(`/user/login-admin`, userData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.get(`/user/logout`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const forgotPassword = async (userData) => {
    try {
      const response = await axiosInstance.post(`/user/forgot-password-token`, userData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const resetPassword = async (token, userData) => {
    try {
      const response = await axiosInstance.put(`/user/reset-password/${token}`, userData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const changePassword = async (userData) => {
    try {
      const response = await axiosInstance.put(`/user/change-password`, userData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const fetchAllUsers = async (page, limit, debouncedKeyword) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/user`, {
        params: {
          page,
          limit,
          keyword: debouncedKeyword,
        },
      });
      const datas = await response.data;
      setUsers(datas.data.users);
      setTotalPages(datas.data.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const blockUser = async (id) => {
    try {
      const response = await axiosInstance.put(`/user/block/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const unblockUser = async (id) => {
    try {
      const response = await axiosInstance.put(`/user/unblock/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axiosInstance.delete(`/user`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <AuthContext.Provider value={{ users, setUsers, loading, setLoading, page, setPage, totalPages, limit, keyword, setKeyword, debouncedKeyword, setDebouncedKeyword, fetchAllUsers, login, logout, forgotPassword, resetPassword, changePassword, blockUser, unblockUser, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
