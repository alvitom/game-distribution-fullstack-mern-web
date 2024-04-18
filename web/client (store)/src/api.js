import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

export const getGameList = async (resource, limitDataVal) => {
  try {
    const response = await axios.get(`${baseUrl}/game/${resource}`);
    const data = await response.data;
    const limitDataGames = data.slice(0, limitDataVal);
    return [limitDataGames, data];
  } catch (err) {
    console.log(`Error fetching data : ${err}`);
  }
};

export const getGamesOnSaleList = async (limitDataVal) => {
  try {
    const [, discounts] = await getGameList("sale");

    const discountedGameIds = discounts.map((discount) => discount.game_id);
    const gamesResponse = await axios.get(`${baseUrl}/game`, {
      params: {
        ids: discountedGameIds.join(","),
      },
    });
    const games = gamesResponse.data;

    const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
      const discountAmount = (originalPrice * discountPercentage) / 100;
      return Math.floor(originalPrice - discountAmount);
    };

    const mergedData = games
      .map((game) => {
        const discount = discounts.find((discount) => discount.game_id === game._id);

        if (discount && new Date(discount.end_date) > new Date()) {
          const discountedPrice = calculateDiscountedPrice(game.price, discount.discount);
          return {
            ...game,
            discount,
            discountedPrice,
          };
        }

        return null;
      })
      .filter(Boolean);
    const limitDataGames = mergedData.slice(0, limitDataVal);
    return [limitDataGames, mergedData];
  } catch (err) {
    console.log(`Error fetching data : ${err}`);
  }
};

export const getGamesTopSellersList = async (limitDataVal) => {
  try {
    const [, gamesTopSellers] = await getGameList("top_sellers");
    const [, discounts] = await getGameList("sale");

    const gameIds = gamesTopSellers.map((gameTopSeller) => gameTopSeller.game_id);
    const gamesResponse = await axios.get(`${baseUrl}/game`, {
      params: {
        ids: gameIds.join(","),
      },
    });
    const games = gamesResponse.data;

    const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
      const discountAmount = (originalPrice * discountPercentage) / 100;
      return Math.floor(originalPrice - discountAmount);
    };

    const mergedData = games
      .map((game) => {
        const discount = discounts.find((discount) => discount.game_id === game._id);
        const gameTopSeller = gamesTopSellers.find((topSeller) => topSeller.game_id === game._id);

        if (discount && new Date(discount.end_date) > new Date()) {
          const discountedPrice = calculateDiscountedPrice(game.price, discount.discount);
          return {
            ...game,
            gameTopSeller,
            discount,
            discountedPrice,
          };
        }

        return { ...game, gameTopSeller };
      })
      .filter(Boolean);
    const limitDataGames = mergedData.slice(0, limitDataVal);
    return [limitDataGames, mergedData];
  } catch (err) {
    console.log(`Error fetching data : ${err}`);
  }
};

export const getGamesMostPlayedList = async (limitDataVal) => {
  try {
    const [, gamesMostPlayed] = await getGameList("most_played");
    const [, discounts] = await getGameList("sale");

    const gameIds = gamesMostPlayed.map((gameTopSeller) => gameTopSeller.game_id);
    const gamesResponse = await axios.get(`${baseUrl}/game`, {
      params: {
        ids: gameIds.join(","),
      },
    });
    const games = gamesResponse.data;

    const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
      const discountAmount = (originalPrice * discountPercentage) / 100;
      return Math.floor(originalPrice - discountAmount);
    };

    const mergedData = games
      .map((game) => {
        const discount = discounts.find((discount) => discount.game_id === game._id);
        const gameTopSeller = gamesMostPlayed.find((topSeller) => topSeller.game_id === game._id);

        if (discount && new Date(discount.end_date) > new Date()) {
          const discountedPrice = calculateDiscountedPrice(game.price, discount.discount);
          return {
            ...game,
            gameTopSeller,
            discount,
            discountedPrice,
          };
        }

        return { ...game, gameTopSeller };
      })
      .filter(Boolean);
    const limitDataGames = mergedData.slice(0, limitDataVal);
    return [limitDataGames, mergedData];
  } catch (err) {
    console.log(`Error fetching data : ${err}`);
  }
};
