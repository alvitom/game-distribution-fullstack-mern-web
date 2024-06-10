import axios from "axios";
import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  const fetchAllGames = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/game`);
      const data = await response.data;
      setGames(data);
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
    } catch (error) {
      console.error("Error fetching game:", error);
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

  return <GameContext.Provider value={{ games, selectedGame, loading, fetchAllGames, fetchGame, createGame, updateGame, deleteGame }}>{children}</GameContext.Provider>;
};
