import React, { createContext, useEffect, useState } from "react";
import { addWishlistUser, fetchWishlistUser, removeWishlistUser } from "../api/wishlist";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      getWishlist();
    }
  }, []);

  const addWishlist = async (gameId) => {
    try {
      setLoading(true);
      const response = await addWishlistUser(gameId);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const getWishlist = async () => {
    try {
      setLoading(true);
      const response = await fetchWishlistUser();
      const data = await response.data;
      setWishlists(data.wishlist);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (id) => {
    try {
      setLoading(true);
      const response = await removeWishlistUser(id);
      return response;
    } finally {
      setLoading(false);
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
        getWishlist,
        removeWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
