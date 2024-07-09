import { axiosInstanceWithCredentials } from "../utils/axios";

const registerUser = async (userData) => {
  try {
    const response = await axiosInstanceWithCredentials.post(`/user/register`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const verifyOTPUser = async (id, userData) => {
  try {
    const response = await axiosInstanceWithCredentials.post(`/user/verify-otp/${id}`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const addUserInformationUser = async (id, userData) => {
  try {
    const response = await axiosInstanceWithCredentials.post(`/user/add-user-information/${id}`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const loginUser = async (userData) => {
  try {
    const response = await axiosInstanceWithCredentials.post(`/user/login`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const logoutUser = async () => {
  try {
    const response = await axiosInstanceWithCredentials.get(`/user/logout`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const forgotPasswordUser = async (userData) => {
  try {
    const response = await axiosInstanceWithCredentials.post(`/user/forgot-password-token`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const resetPasswordUser = async (token, userData) => {
  try {
    const response = await axiosInstanceWithCredentials.put(`/user/reset-password/${token}`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const changePasswordUser = async (userData) => {
  try {
    const response = await axiosInstanceWithCredentials.put(`/user/change-password`, userData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const deleteAccountUser = async () => {
  try {
    const response = await axiosInstanceWithCredentials.delete(`/user`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { registerUser, verifyOTPUser, addUserInformationUser, loginUser, logoutUser, forgotPasswordUser, resetPasswordUser, changePasswordUser, deleteAccountUser };
