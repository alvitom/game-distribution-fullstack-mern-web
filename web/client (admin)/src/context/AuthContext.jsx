import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const limit = 10;

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_DEV,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
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

  const login = async (userData) => {
    try {
      const response = await axiosInstance.post(`/user/login-admin`, userData);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Login admin failed:", error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get(`/user/logout`);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const fetchAllUsers = async (page, limit, debouncedKeyword) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/user`, {
        params: {
          page,
          limit,
          keyword: debouncedKeyword,
        },
      });
      const data = await response.data;
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const blockUser = async (id) => {
    try {
      const response = await axiosInstance.put(`/user/block/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error blocking users:", error);
    }
  };

  const unblockUser = async (id) => {
    try {
      const response = await axiosInstance.put(`/user/unblock/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error unblocking users:", error);
    }
  };

  const deleteAccount = async (id) => {
    try {
      const response = await axiosInstance.delete(`/user/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const createGame = async (game) => {
    try {
      const response = await axiosInstance.post("/game", game);
      const data = await response.data;
      setGames([...games, data]);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const updateGame = async (id, updatedGame) => {
    try {
      const response = await axiosInstance.put(`/game/${id}`, updatedGame);
      const data = await response.data;
      setGames(games.map((game) => (game._id === id ? data : game)));
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  const deleteGame = async (id) => {
    try {
      await axiosInstance.delete(`/game/${id}`);
      setGames(games.filter((game) => game._id !== id));
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ users, setUsers, loading, setLoading, page, setPage, totalPages, limit, keyword, setKeyword, debouncedKeyword, setDebouncedKeyword, fetchAllUsers, login, logout, blockUser, unblockUser, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};
