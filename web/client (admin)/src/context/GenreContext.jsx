import axios from "axios";
import { createContext, useState } from "react";

export const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  const fetchAllGenres = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/genre`);
      const data = await response.data;
      setGenres(data);
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

  return <GenreContext.Provider value={{ genres, selectedGenre, loading, fetchAllGenres, fetchGenre /* , createGame, updateGame, deleteGame */ }}>{children}</GenreContext.Provider>;
};
