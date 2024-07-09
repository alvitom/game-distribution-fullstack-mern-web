import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";

const TopSellersCollection = () => {
  const { getTopSellerGames, topSellerGames } = useContext(GameContext);
  const limit = 50

  useEffect(() => {
    getTopSellerGames(limit);
  }, []);
  return (
    <>
      <Meta title="Top Seller Games" />
      <div className="top-seller-wrapper">
        <div className="container">
          <div className="row mx-sm-0 mx-2">
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
