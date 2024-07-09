import React, { useContext, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import GameCard from "../components/GameCard";
import Meta from "../components/Meta";

const SaleCollection = () => {
  const { getSaleGames, saleGames } = useContext(GameContext);
  const limit = 50;

  useEffect(() => {
    getSaleGames(limit);
  }, []);
  return (
    <>
      <Meta title="Sale Games" />
      <div className="sale-wrapper">
        <div className="container">
          <div className="row mx-sm-0 mx-2">
            <div className="col-12 my-4">
              <h1>Games On Sale</h1>
            </div>
            {saleGames.map((game, index) => (
              <GameCard collection="sale" data={game} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleCollection;
