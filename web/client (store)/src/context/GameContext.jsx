import axios from "axios";
import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [saleGames, setSaleGames] = useState([]);
  const [topSellerGames, setTopSellerGames] = useState([]);
  const [mostPlayedGames, setMostPlayedGames] = useState([]);
  const [newReleaseGames, setNewReleaseGames] = useState([]);
  const [trendingGames, setTrendingGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [totalNetPrice, setTotalNetPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
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

  const fetchSaleGames = async (limit) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/game/sale`, {
        params: {
          limit,
        },
      });
      const datas = await response.data;
      setSaleGames(datas.data.saleGames);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const fetchTopSellerGames = async (limit) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/game/top-seller`, {
        params: {
          limit,
        },
      });
      const datas = await response.data;
      setTopSellerGames(datas.data.topSellerGames);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const fetchMostPlayedGames = async (limit) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/game/most-played`, {
        params: {
          limit,
        },
      });
      const datas = await response.data;
      setMostPlayedGames(datas.data.mostPlayedGames);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const fetchNewReleaseGames = async (limit) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/game/new-release`, {
        params: {
          limit,
        },
      });
      const datas = await response.data;
      setNewReleaseGames(datas.data.newReleaseGames);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const fetchTrendingGames = async (limit) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/game/trending`, {
        params: {
          limit,
        },
      });
      const datas = await response.data;
      setTrendingGames(datas.data.trendingGames);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return error.response.data;
    }
  };

  const fetchUpcomingGames = async (limit) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/game/upcoming`, {
        params: {
          limit,
        },
      });
      const datas = await response.data;
      setUpcomingGames(datas.data.upcomingGames);
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
      setSelectedGame(datas.data.game);
      setTotalNetPrice(datas.data.totalNetPrice);
      setTotalDiscount(datas.data.totalDiscount);
      setNewPrice(datas.data.newPrice);
      setServiceFee(datas.data.serviceFee);
      setTotalPrice(datas.data.total);
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
        saleGames,
        topSellerGames,
        mostPlayedGames,
        newReleaseGames,
        trendingGames,
        upcomingGames,
        selectedGame,
        totalNetPrice,
        totalDiscount,
        newPrice,
        serviceFee,
        totalPrice,
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
        fetchSaleGames,
        fetchTopSellerGames,
        fetchMostPlayedGames,
        fetchNewReleaseGames,
        fetchTrendingGames,
        fetchUpcomingGames,
        fetchGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
