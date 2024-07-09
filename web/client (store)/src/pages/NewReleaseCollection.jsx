import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";

const NewReleaseCollection = () => {
  const { getNewReleaseGames, newReleaseGames } = useContext(GameContext);
  const limit = 50;

  useEffect(() => {
    getNewReleaseGames(limit);
  }, []);
  return (
    <>
      <Meta title="New Release Games" />
      <div className="new-release-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 my-4">
              <h1>New Release</h1>
            </div>
            {newReleaseGames.map((game, index) => (
              <GameCard collection="new-release" data={game} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReleaseCollection;
