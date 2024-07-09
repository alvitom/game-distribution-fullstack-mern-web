import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";

const MostPlayedCollection = () => {
  const { getMostPlayedGames, mostPlayedGames } = useContext(GameContext);
  const limit = 50;

  useEffect(() => {
    getMostPlayedGames(limit);
  }, []);
  return (
    <>
      <Meta title="Most Played Games" />
      <div className="most-played-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 my-4">
              <h1>Most Played</h1>
            </div>
            {mostPlayedGames.map((game, index) => (
              <GameCard collection="most-played" data={game} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MostPlayedCollection;
