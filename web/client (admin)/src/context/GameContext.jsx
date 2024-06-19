import axios from "axios";
import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [genre, setGenre] = useState("");
  const [feature, setFeature] = useState("");
  const [platform, setPlatform] = useState("");
  const limit = 10;

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL_DEV,
    headers: {
      "Content-Type": "multipart/form-data",
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

  const fetchAllGames = async (page, limit, debouncedKeyword, genre, feature, platform) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/game`, {
        params: {
          page,
          limit,
          keyword: debouncedKeyword,
          genre,
          feature,
          platform,
        },
      });
      const data = await response.data;
      setGames(data.games);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      setLoading(false);
    }
  };

  const fetchGame = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/game/${id}`);
      const data = await response.data;
      setSelectedGame(data);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Error fetching game:", error);
      setLoading(false);
    }
  };

  const createGame = async (gameData) => {
    try {
      const response = await axiosInstance.post("/game", gameData);
      const data = await response.data;
      setGames([...games, data]);
      return data;
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const updateGame = async (id, updatedGame) => {
    try {
      const response = await axiosInstance.put(`/game/${id}`, updatedGame);
      const data = await response.data;
      setGames(games.map((game) => (game._id === id ? data : game)));
      return data;
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  const deleteGame = async (id) => {
    try {
      const response = await axiosInstance.delete(`/game/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <GameContext.Provider
      value={{ games, setGames, selectedGame, loading, setLoading, page, setPage, totalPages, limit, keyword, setKeyword, debouncedKeyword, setDebouncedKeyword, genre, feature, platform, fetchAllGames, fetchGame, createGame, updateGame, deleteGame }}
    >
      {children}
    </GameContext.Provider>
  );
};
