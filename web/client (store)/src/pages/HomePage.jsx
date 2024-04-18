import { useEffect, useState } from "react";
import Slideshow from "../components/Slideshow/Slideshow";
import HeaderList from "../components/GameList/HeaderList";
import GameList from "../components/GameList/GameList";
import { getGameList, getGamesMostPlayedList, getGamesOnSaleList, getGamesTopSellersList } from "../api";

const HomePage = () => {
  const [GamesOnSale, setGamesOnSale] = useState([]);
  const [freeGames, setFreeGames] = useState([]);
  const [gamesTopSeller, setGamesTopSeller] = useState([]);
  const [gamesMostPlayed, setGamesMostPlayed] = useState([]);
  const [gamesUpcoming, setGamesUpcoming] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const [getGamesOnSale] = await getGamesOnSaleList(6);
        setGamesOnSale(getGamesOnSale);
        const [getFreeGames] = await getGameList("free_games", 6);
        setFreeGames(getFreeGames);
        const [getGamesTopSeller] = await getGamesTopSellersList(6);
        setGamesTopSeller(getGamesTopSeller);
        const [getGamesMostPlayed] = await getGamesMostPlayedList(6);
        setGamesMostPlayed(getGamesMostPlayed);
        const [getGamesUpcoming] = await getGameList("upcoming", 6);
        setGamesUpcoming(getGamesUpcoming);
      } catch (err) {
        console.log(`Error fetching data : ${err}`);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      <div className="container">
        <Slideshow games={gamesTopSeller} />

        {/* Sale */}
        <section className="border-bottom border-secondary mt-4">
          <HeaderList title="Holiday Sale" linkHref="/game/sale" linkTitle="Lihat Semua" />
          <GameList games={GamesOnSale} />
        </section>

        {/* Free Games */}
        <section className="border-bottom border-secondary mt-4">
          <HeaderList title="Free to Play" linkHref="/game/free_games" linkTitle="Lihat Semua" />
          <GameList games={freeGames} />
        </section>

        {/* Top Seller */}
        <section className="border-bottom border-secondary mt-4">
          <HeaderList title="Top Seller" linkHref="/game/top_seller" linkTitle="Lihat Semua" />
          <GameList games={gamesTopSeller} />
        </section>

        {/* Most Played */}
        <section className="border-bottom border-secondary mt-4">
          <HeaderList title="Most Played" linkHref="/game/most_played" linkTitle="Lihat Semua" />
          <GameList games={gamesMostPlayed} />
        </section>

        {/* Upcoming */}
        <section className="border-bottom border-secondary mt-4">
          <HeaderList title="Upcoming" linkHref="/game/upcoming" linkTitle="Lihat Semua" />
          <GameList games={gamesUpcoming} />
        </section>
      </div>
    </>
  );
};

export default HomePage;
