import axios from "axios";
import { createContext, useState } from "react";

export const FeatureContext = createContext();

export const FeatureProvider = ({ children }) => {
  const [features, setFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  const fetchAllFeatures = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/feature`);
      const data = await response.data;
      setFeatures(data);
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

  return <FeatureContext.Provider value={{ features, selectedFeature, loading, fetchAllFeatures , fetchFeature/* , createGame, updateGame, deleteGame */ }}>{children}</FeatureContext.Provider>;
};
