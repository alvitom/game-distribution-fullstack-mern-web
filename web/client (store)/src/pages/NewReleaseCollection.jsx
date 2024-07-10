import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";
import { Skeleton } from "@mantine/core";

const NewReleaseCollection = () => {
  const { getNewReleaseGames, newReleaseGames, loading } = useContext(GameContext);
  const limit = 50;

  useEffect(() => {
    getNewReleaseGames(limit);
  }, []);
  return (
    <>
      <Meta title="New Release Games" />
      <div className="new-release-wrapper">
        <div className="container">
          <div className="row mx-sm-0 mx-2">
            <div className="col-12 my-4">
              <h1>New Release</h1>
            </div>
            {loading
              ? Array.from({ length: limit }).map((_, index) => (
                  <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                    <Skeleton height={300} radius="md" key={index} className="my-3" />
                  </div>
                ))
              : newReleaseGames.map((game, index) => (
              <GameCard collection="new-release" data={game} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReleaseCollection;
