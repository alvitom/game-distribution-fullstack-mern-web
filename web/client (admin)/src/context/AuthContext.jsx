import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("user");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
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
      const { token } = await response.data;
      if (token) {
        sessionStorage.setItem("user", token);
      }
    } catch (error) {
      console.error("Login admin failed:", error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get(`/user/logout`);
    } catch (error) {
      console.error("Login admin failed:", error);
    }
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/user`);
      const data = await response.data;
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
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

  return <AuthContext.Provider value={{ users, loading, fetchAllUsers, login , logout/* , updateGame, deleteGame */ }}>{children}</AuthContext.Provider>;
};
