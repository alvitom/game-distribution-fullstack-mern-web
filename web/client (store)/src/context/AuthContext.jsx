import { createContext, useState } from "react";
import { registerUser, verifyOTPUser, addUserInformationUser, loginUser, logoutUser, forgotPasswordUser, resetPasswordUser, changePasswordUser, deleteAccountUser } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const register = async (data) => {
    try {
      setLoading(true);
      const response = await registerUser(data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (userId, data) => {
    try {
      setLoading(true);
      const response = await verifyOTPUser(userId, data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const addUserInformation = async (userId, data) => {
    try {
      setLoading(true);
      const response = await addUserInformationUser(userId, data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await loginUser(data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await logoutUser();
      return response;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (data) => {
    try {
      setLoading(true);
      const response = await forgotPasswordUser(data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, data) => {
    try {
      setLoading(true);
      const response = await resetPasswordUser(token, data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (data) => {
    try {
      setLoading(true);
      const response = await changePasswordUser(data);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setLoading(true);
      const response = await deleteAccountUser();
      return response;
    } finally {
      setLoading(false);
    }
  };

  return <AuthContext.Provider value={{ loading, setLoading, register, verifyOTP, addUserInformation, login, logout, forgotPassword, resetPassword, changePassword, deleteAccount }}>{children}</AuthContext.Provider>;
};
