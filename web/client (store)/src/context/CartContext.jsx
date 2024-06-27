import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      fetchCart();
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

  const addCart = async (gameId) => {
    try {
      const response = await axiosInstance.post(`/cart`, gameId);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`cart`);
      const datas = await response.data;
      setCarts(datas.data.cart);
      setTotalPrice(datas.data.totalPrice);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const removeCart = async (id) => {
    try {
      const response = await axiosInstance.delete(`/cart/${id}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        setCarts,
        totalPrice,
        setTotalPrice,
        loading,
        setLoading,
        addCart,
        fetchCart,
        removeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
