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
      const datas = await response.data;
      setGames(datas.data.games);
      setTotalPages(datas.data.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const fetchGame = async (title) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/game/${title}`);
      const datas = await response.data;
      setSelectedGame(datas.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const createGame = async (gameData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/game", gameData);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const updateGame = async (id, updatedGame) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/game/${id}`, updatedGame);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const deleteGame = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(`/game/${id}`);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  return (
    <GameContext.Provider
      value={{
        games,
        setGames,
        selectedGame,
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
        genre,
        feature,
        platform,
        fetchAllGames,
        fetchGame,
        createGame,
        updateGame,
        deleteGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
