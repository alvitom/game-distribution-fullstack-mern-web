import { axiosInstance } from "../utils/axios";

const fetchAllGames = async (page, limit, genre, feature, platform) => {
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
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchSaleGames = async (limit) => {
  try {
    const response = await axiosInstance.get(`/game/sale`, {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchTopSellerGames = async (limit) => {
  try {
    const response = await axiosInstance.get(`/game/top-seller`, {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchMostPlayedGames = async (limit) => {
  try {
    const response = await axiosInstance.get(`/game/most-played`, {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchNewReleaseGames = async (limit) => {
  try {
    const response = await axiosInstance.get(`/game/new-release`, {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchTrendingGames = async (limit) => {
  try {
    const response = await axiosInstance.get(`/game/trending`, {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchUpcomingGames = async (limit) => {
  try {
    const response = await axiosInstance.get(`/game/upcoming`, {
      params: {
        limit,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const fetchGame = async (title) => {
  try {
    const response = await axiosInstance.get(`/game/${title}`);
    return response.data; 
  } catch (error) {
    return error.response.data;
  }
};

export { fetchAllGames, fetchSaleGames, fetchTopSellerGames, fetchMostPlayedGames, fetchNewReleaseGames, fetchTrendingGames, fetchUpcomingGames, fetchGame };
