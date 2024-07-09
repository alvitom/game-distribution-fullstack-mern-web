import React, { createContext, useEffect, useState } from "react";
import { addCartUser, fetchCartUser, removeCartUser } from "../api/cart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [totalNetPrice, setTotalNetPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      getCart();
    }
  }, []);

  const addCart = async (gameId) => {
    try {
      setLoading(true);
      const response = await addCartUser(gameId);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const getCart = async () => {
    try {
      setLoading(true);
      const response = await fetchCartUser();
      const data = await response.data;
      setCarts(data.cart);
      setTotalNetPrice(data.totalNetPrice);
      setTotalPrice(data.totalPrice);
      setTotalDiscount(data.totalDiscount);
      setServiceFee(data.serviceFee);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  };

  const removeCart = async (id) => {
    try {
      setLoading(true);
      const response = await removeCartUser(id);
      return response;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        setCarts,
        totalPrice,
        totalNetPrice,
        totalDiscount,
        serviceFee,
        total,
        loading,
        setLoading,
        addCart,
        getCart,
        removeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
