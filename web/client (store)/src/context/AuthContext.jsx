import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
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
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/user/register`, userData);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const verifyOTP = async (id, userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/user/verify-otp/${id}`, userData);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const addUserInformation = async (id, userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/user/add-user-information/${id}`, userData);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/user/login`, userData);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/user/logout`);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const forgotPassword = async (userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/user/forgot-password-token`, userData);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const resetPassword = async (token, userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/user/reset-password/${token}`, userData);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const changePassword = async (userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/user/change-password`, userData);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const deleteAccount = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/user`);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  return <AuthContext.Provider value={{ loading, setLoading, register, verifyOTP, addUserInformation, login, logout, forgotPassword, resetPassword, changePassword, deleteAccount }}>{children}</AuthContext.Provider>;
};
