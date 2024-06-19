import axios from "axios";
import { createContext, useState } from "react";

export const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
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

  const fetchAllGenres = async (page, limit, debouncedKeyword) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/genre`, {
        params: {
          page,
          limit,
          keyword: debouncedKeyword,
        },
      });
      const data = await response.data;
      setGenres(data.genres);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching genres:", error);
      setLoading(false);
    }
  };

  const fetchGenre = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/genre/${id}`);
      const data = await response.data;
      setSelectedGenre(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching genre:", error);
      setLoading(false);
    }
  };

  const createGenre = async (genre) => {
    try {
      const response = await axiosInstance.post("/genre", genre);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error creating genre:", error);
    }
  };

  const updateGenre = async (id, updatedGenre) => {
    try {
      const response = await axiosInstance.put(`/genre/${id}`, updatedGenre);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error updating genre:", error);
    }
  };

  const deleteGenre = async (id) => {
    try {
      const response = await axiosInstance.delete(`/genre/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
  };

  return (
    <GenreContext.Provider
      value={{
        genres,
        setGenres,
        selectedGenre,
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
        fetchAllGenres,
        fetchGenre,
        createGenre,
        updateGenre,
        deleteGenre,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};
