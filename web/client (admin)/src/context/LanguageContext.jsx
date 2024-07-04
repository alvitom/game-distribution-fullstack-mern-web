import axios from "axios";
import { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
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

  const fetchAllLanguages = async (page, limit, debouncedKeyword) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/language`, {
        params: {
          page,
          limit,
          keyword: debouncedKeyword,
        },
      });
      const data = await response.data;
      setLanguages(data.languages);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const fetchLanguage = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/language/${id}`);
      const data = await response.data;
      setSelectedLanguage(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const createLanguage = async (language) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/language", language);
      const data = await response.data;
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const updateLanguage = async (id, updatedLanguage) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/language/${id}`, updatedLanguage);
      const data = await response.data;
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const deleteLanguage = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/language/${id}`);
      const data = await response.data;
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        languages,
        setLanguages,
        selectedLanguage,
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
        fetchAllLanguages,
        fetchLanguage,
        createLanguage,
        updateLanguage,
        deleteLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
