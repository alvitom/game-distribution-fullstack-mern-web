import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, []);

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

  const addWishlist = async (gameId) => {
    try {
      const response = await axiosInstance.post(`/wishlist`, gameId);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/wishlist`);
      const datas = await response.data;
      setWishlists(datas.data.wishlist);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const removeWishlist = async (id) => {
    try {
      const response = await axiosInstance.delete(`/wishlist/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlists,
        setWishlists,
        loading,
        setLoading,
        addWishlist,
        fetchWishlist,
        removeWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
