import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";

const UpcomingCollection = () => {
  const { fetchUpcomingGames, upcomingGames } = useContext(GameContext);
  const limit = 50;

  useEffect(() => {
    fetchUpcomingGames(limit);
  }, []);
  return (
    <>
      <Meta title="Upcoming Games" />
      <div className="upcoming-wrapper">
        <div className="container">
          <div className="row">
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
