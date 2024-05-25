import React from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";

const UpcomingCollection = () => {
  return (
    <>
      <Meta title="Game Yang Akan Hadir" />
      <div className="upcoming-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 my-4">
              <h1>Segera Hadir</h1>
            </div>
            <GameCard collection="upcoming" />
            <GameCard collection="upcoming" />
            <GameCard collection="upcoming" />
            <GameCard collection="upcoming" />
            <GameCard collection="upcoming" />
            <GameCard collection="upcoming" />
            <GameCard collection="upcoming" />
            <GameCard collection="upcoming" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingCollection;
