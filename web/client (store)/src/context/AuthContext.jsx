import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const register = async (userData) => {
    try {
      const response = await axiosInstance.post(`/user/register`, userData);
      const data = await response.data;
      return data;
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const verifyOTP = async (id, userData) => {
    try {
      const response = await axiosInstance.post(`/user/verify-otp/${id}`, userData);
      const data = await response.data;
      return data;
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const addUserInformation = async (id, userData) => {
    try {
      const response = await axiosInstance.post(`/user/add-user-information/${id}`, userData);
      const data = await response.data;
      return data;
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const login = async (userData) => {
    try {
      const response = await axiosInstance.post(`/user/login`, userData);
      const data = await response.data;
      return data;
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get(`/user/logout`);
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const forgotPassword = async (userData) => {
    try {
      const response = await axiosInstance.post(`/user/forgot-password-token`, userData);
      const data = await response.data;
      return data;
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const resetPassword = async (token, userData) => {
    try {
      const response = await axiosInstance.put(`/user/reset-password/${token}`, userData);
      const data = await response.data;
      return data;
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const deleteAccount = async (id) => {
    try {
      const response = await axiosInstance.delete(`/user/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  return <AuthContext.Provider value={{ error, loading, setLoading, register, verifyOTP, addUserInformation, login, logout, forgotPassword, resetPassword, deleteAccount }}>{children}</AuthContext.Provider>;
};
