import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";
import { Skeleton } from "@mantine/core";

const TrendingCollection = () => {
  const { getTrendingGames, trendingGames, loading } = useContext(GameContext);
  const limit = 50;

  useEffect(() => {
    getTrendingGames(limit);
  }, []);
  return (
    <>
      <Meta title="Trending Games" />
      <div className="trending-wrapper">
        <div className="container">
          <div className="row mx-sm-0 mx-2">
            <div className="col-12 my-4">
              <h1>Trending</h1>
            </div>
            {loading
              ? Array.from({ length: limit }).map((_, index) => (
                  <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                    <Skeleton height={300} radius="md" key={index} className="my-3" />
                  </div>
                ))
              : trendingGames.map((game, index) => (
              <GameCard collection="trending" data={game} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingCollection;
