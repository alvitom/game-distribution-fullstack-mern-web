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

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const data = JSON.parse(sessionStorage.getItem("user"));
//       if (data) {
//         config.headers["Authorization"] = `Bearer ${data.token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

  const fetchAllGames = async (page, limit, genre, feature, platform) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/game`, {
        params: {
          page,
          limit,
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
        keyword,
        setKeyword,
        debouncedKeyword,
        setDebouncedKeyword,
        genre,
        feature,
        platform,
        fetchAllGames,
        fetchGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
