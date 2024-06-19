import axios from "axios";
import { createContext, useState } from "react";

export const FeatureContext = createContext();

export const FeatureProvider = ({ children }) => {
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
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

  const fetchAllFeatures = async (page, limit, debouncedKeyword) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/feature`, {
        params: {
          page,
          limit,
          keyword: debouncedKeyword,
        },
      });
      const data = await response.data;
      setFeatures(data.features);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching features:", error);
      setLoading(false);
    }
  };

  const fetchFeature = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/feature/${id}`);
      const data = await response.data;
      setSelectedFeature(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching feature:", error);
      setLoading(false);
    }
  };

  const createFeature = async (feature) => {
    try {
      const response = await axiosInstance.post("/feature", feature);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error creating feature:", error);
    }
  };

  const updateFeature = async (id, updatedFeature) => {
    try {
      const response = await axiosInstance.put(`/feature/${id}`, updatedFeature);
      const data = await response.data;
      setFeatures(features.map((feature) => (feature._id === id ? data : feature)));
      return data;
    } catch (error) {
      console.error("Error updating feature:", error);
    }
  };

  const deleteFeature = async (id) => {
    try {
      const response = await axiosInstance.delete(`/feature/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
  };

  return (
    <FeatureContext.Provider
      value={{
        features,
        setFeatures,
        selectedFeature,
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
        fetchAllFeatures,
        fetchFeature,
        createFeature,
        updateFeature,
        deleteFeature,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};
