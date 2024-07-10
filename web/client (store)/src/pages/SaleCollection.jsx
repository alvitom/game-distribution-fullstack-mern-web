import React, { useContext, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import GameCard from "../components/GameCard";
import Meta from "../components/Meta";
import { Skeleton } from "@mantine/core";

const SaleCollection = () => {
  const { getSaleGames, saleGames, loading } = useContext(GameContext);
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
            {loading
              ? Array.from({ length: limit }).map((_, index) => (
                  <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                    <Skeleton height={300} radius="md" key={index} className="my-3" />
                  </div>
                ))
              : saleGames.map((game, index) => <GameCard collection="sale" data={game} key={index} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleCollection;
