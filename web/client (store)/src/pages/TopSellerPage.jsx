import { useEffect, useState } from "react";
import { getGamesTopSellersList } from "../api.js";
import HeaderList from "../components/GameList/HeaderList.jsx";
import GameList from "../components/GameList/GameList.jsx";

const TopSellerPage = () => {
  const [gamesTopSeller, setGamesTopSeller] = useState([]);
  const [limit, setLimit] = useState(20);
  const [totalResult, setTotalResult] = useState();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const [getGamesTopSeller, getTotalResult] = await getGamesTopSellersList(limit)
        setGamesTopSeller(getGamesTopSeller);
        setTotalResult(getTotalResult);
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
        <HeaderList title="Top Seller" />
        <GameList colVal={3} games={gamesTopSeller} />
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

export default TopSellerPage;
