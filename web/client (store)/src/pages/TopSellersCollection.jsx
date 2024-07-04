import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";

const TopSellersCollection = () => {
  const { fetchTopSellerGames, topSellerGames } = useContext(GameContext);
  const limit = 50

  useEffect(() => {
    fetchTopSellerGames(limit);
  }, []);
  return (
    <>
      <Meta title="Top Seller Games" />
      <div className="top-seller-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 my-4">
              <h1>Top Sellers</h1>
            </div>
            {topSellerGames.map((game, index) => (
              <GameCard collection="top-sellers" data={game} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSellersCollection;
