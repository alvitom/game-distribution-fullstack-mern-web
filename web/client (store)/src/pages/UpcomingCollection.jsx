import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";

const UpcomingCollection = () => {
  const { getUpcomingGames, upcomingGames } = useContext(GameContext);
  const limit = 50;

  useEffect(() => {
    getUpcomingGames(limit);
  }, []);
  return (
    <>
      <Meta title="Upcoming Games" />
      <div className="upcoming-wrapper">
        <div className="container">
          <div className="row mx-sm-0 mx-2">
            <div className="col-12 my-4">
              <h1>Upcoming</h1>
            </div>
            {upcomingGames.map((game, index) => (
              <GameCard collection="upcoming" data={game} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingCollection;
