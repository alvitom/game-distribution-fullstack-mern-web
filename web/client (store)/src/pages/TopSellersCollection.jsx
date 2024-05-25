import React from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";

const TopSellersCollection = () => {
  return (
    <>
      <Meta title="Game Penjualan Teratas" />
      <div className="top-seller-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 my-4">
              <h1>Penjualan Teratas</h1>
            </div>
            <GameCard collection="top-sellers" />
            <GameCard collection="top-sellers" />
            <GameCard collection="top-sellers" />
            <GameCard collection="top-sellers" />
            <GameCard collection="top-sellers" />
            <GameCard collection="top-sellers" />
            <GameCard collection="top-sellers" />
            <GameCard collection="top-sellers" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSellersCollection;
