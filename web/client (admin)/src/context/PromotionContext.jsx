import axios from "axios";
import { createContext, useState } from "react";

export const PromotionContext = createContext();

export const PromotionProvider = ({ children }) => {
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const limit = 10;

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_DEV,
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

  const fetchAllPromotions = async (page, limit, debouncedKeyword) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/promotion`, {
        params: {
          page,
          limit,
          keyword: debouncedKeyword,
        },
      });
      const data = await response.data;
      setPromotions(data.promotions);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      setLoading(false);
    }
  };

  const fetchPromotion = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/promotion/${id}`);
      const data = await response.data;
      setSelectedPromotion(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching promotion:", error);
      setLoading(false);
    }
  };

  const createPromotion = async (promotion) => {
    try {
      const response = await axiosInstance.post("/promotion", promotion);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error creating promotion:", error);
    }
  };

  const updatePromotion = async (id, updatedPromotion) => {
    try {
      const response = await axiosInstance.put(`/promotion/${id}`, updatedPromotion);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error updating promotion:", error);
    }
  };

  const deletePromotion = async (id) => {
    try {
      const response = await axiosInstance.delete(`/promotion/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
  };

  return (
    <PromotionContext.Provider
      value={{
        promotions,
        setPromotions,
        selectedPromotion,
        loading,
        setLoading,
        page,
        setPage,
        totalPages,
        limit,
        keyword,
        setKeyword,
        debouncedKeyword,
        setDebouncedKeyword,
        fetchAllPromotions,
        fetchPromotion,
        createPromotion,
        updatePromotion,
        deletePromotion,
      }}
    >
      {children}
    </PromotionContext.Provider>
  );
};
