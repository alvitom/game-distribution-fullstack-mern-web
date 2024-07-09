import { axiosInstanceWithCredentials } from "../utils/axios";

const addWishlistUser = async (gameId) => {
  try {
    const response = await axiosInstanceWithCredentials.post(`/wishlist`, gameId);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchWishlistUser = async () => {
  try {
    const response = await axiosInstanceWithCredentials.get(`/wishlist`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const removeWishlistUser = async (id) => {
  try {
    const response = await axiosInstanceWithCredentials.delete(`/wishlist/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export { addWishlistUser, fetchWishlistUser, removeWishlistUser };
