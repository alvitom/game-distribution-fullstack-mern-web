import { axiosInstanceWithCredentials } from "../utils/axios";

const addCartUser = async (gameId) => {
  try {
    const response = await axiosInstanceWithCredentials.post(`/cart`, gameId);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchCartUser = async () => {
  try {
    const response = await axiosInstanceWithCredentials.get(`cart`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const removeCartUser = async (id) => {
  try {
    const response = await axiosInstanceWithCredentials.delete(`/cart/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { addCartUser, fetchCartUser, removeCartUser };
