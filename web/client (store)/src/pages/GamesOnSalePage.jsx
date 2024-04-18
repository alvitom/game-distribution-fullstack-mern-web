import { useEffect, useState } from "react";
import GameList from "../components/GameList/GameList";
import HeaderList from "../components/GameList/HeaderList";
import { getGamesOnSaleList } from "../api";

const GamesOnSalePage = () => {
  const [GamesOnSale, setGamesOnSale] = useState([]);
  const [limit, setLimit] = useState(20);
  const [totalResult, setTotalResult] = useState();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const [getGamesOnSale, getTotalResult] = await getGamesOnSaleList(limit)
        setGamesOnSale(getGamesOnSale);
        setTotalResult(getTotalResult)
      } catch (err) {
        console.log(`Error fetching data : ${err}`);
      }
    };

    fetchGames();
  }, [limit]);

  const handleLoadMore = () => {
    setLimit((prevState) => prevState + 20);
  };

  return (
    <>
      <div className="container mt-5">
        <HeaderList title="Games On Sale" />
        <GameList colVal={3} games={GamesOnSale} />
        {limit < totalResult?.length ? (
          <div className="d-flex justify-content-center align-items-center mb-5">
            <button className="btn btn-success" onClick={handleLoadMore}>
              Lebih Banyak
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GamesOnSalePage;
