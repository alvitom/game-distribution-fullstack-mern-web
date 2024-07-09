import { axiosInstanceWithCredentials } from "../utils/axios";

const createTransactionUser = async (data) => {
  try {
    const response = await axiosInstanceWithCredentials.post(`/transaction`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const updateTransactionUser = async (data) => {
  try {
    const response = await axiosInstanceWithCredentials.post(`/midtrans/notification`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchAllTransactionUser = async (page, limit) => {
  try {
    const response = await axiosInstanceWithCredentials.get(`/transaction`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { createTransactionUser, updateTransactionUser, fetchAllTransactionUser };
