import React from "react";
import Meta from "../components/Meta";
import GenreCard from "../components/GenreCard";
import GameCard from "../components/GameCard";

const Browse = () => {
  return (
    <>
      <Meta title="Selamat Datang di Alvito Games Store" />
      <div className="browse-wrapper">
        <div className="container">
          <section className="genre-section py-4">
            <div className="row">
              <div className="col-12">
                <h3>Genre</h3>
              </div>
              <GenreCard />
              <GenreCard />
              <GenreCard />
              <GenreCard />
            </div>
          </section>
          <section className="sort-section mt-3 py-4">
            <div className="row">
              <div className="col-10">
                <div className="row">
                  <div className="col-12 sort d-flex gap-2 align-items-center">
                    <span>Show: </span>
                    <select name="" id=""></select>
                  </div>
                </div>
                <div className="row">
                  <GameCard />
                  <GameCard />
                  <GameCard />
                  <GameCard />
                  <GameCard />
                  <GameCard />
                  <GameCard />
                  <GameCard />
                  <GameCard />
                  <GameCard />
                  <GameCard />
                  <GameCard />
                </div>
              </div>
              <div className="col-2">
                
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Browse;
