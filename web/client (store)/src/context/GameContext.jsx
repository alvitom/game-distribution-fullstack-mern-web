import React, { createContext, useState } from "react";
import { fetchAllGames, fetchSaleGames, fetchTopSellerGames, fetchMostPlayedGames, fetchNewReleaseGames, fetchTrendingGames, fetchUpcomingGames, fetchGame } from "../api/game";

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

  const getAllGames = async (page, limit, genre, feature, platform) => {
    try {
      setLoading(true);
      const response = await fetchAllGames(page, limit, genre, feature, platform);
      const data = await response.data;
      setGames(data.games);
      setTotalPages(data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const getSaleGames = async (limit) => {
    try {
      setLoading(true);
      const response = await fetchSaleGames(limit);
      const data = await response.data;
      setSaleGames(data.saleGames);
    } finally {
      setLoading(false);
    }
  };

  const getTopSellerGames = async (limit) => {
    try {
      setLoading(true);
      const response = await fetchTopSellerGames(limit);
      const data = await response.data;
      setTopSellerGames(data.topSellerGames);
    } finally {
      setLoading(false);
    }
  };

  const getMostPlayedGames = async (limit) => {
    try {
      setLoading(true);
      const response = await fetchMostPlayedGames(limit);
      const data = await response.data;
      setMostPlayedGames(data.mostPlayedGames);
    } finally {
      setLoading(false);
    }
  };

  const getNewReleaseGames = async (limit) => {
    try {
      setLoading(true);
      const response = await fetchNewReleaseGames(limit);
      const data = await response.data;
      setNewReleaseGames(data.newReleaseGames);
    } finally {
      setLoading(false);
    }
  };

  const getTrendingGames = async (limit) => {
    try {
      setLoading(true);
      const response = await fetchTrendingGames(limit);
      const data = await response.data;
      setTrendingGames(data.trendingGames);
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingGames = async (limit) => {
    try {
      setLoading(true);
      const response = await fetchUpcomingGames(limit);
      const data = await response.data;
      setUpcomingGames(data.upcomingGames);
    } finally {
      setLoading(false);
    }
  };

  const getDetailGame = async (title) => {
    try {
      setLoading(true);
      const response = await fetchGame(title);
      const data = await response.data;
      setSelectedGame(data.game);
      setTotalNetPrice(data.totalNetPrice);
      setTotalDiscount(data.totalDiscount);
      setNewPrice(data.newPrice);
      setServiceFee(data.serviceFee);
      setTotalPrice(data.total);
    } finally {
      setLoading(false);
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
        getAllGames,
        getSaleGames,
        getTopSellerGames,
        getMostPlayedGames,
        getNewReleaseGames,
        getTrendingGames,
        getUpcomingGames,
        getDetailGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
