import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";
import { Pagination, Skeleton } from "@mantine/core";

const Game = () => {
  const { getAllGames, page, setPage, games, loading, totalPages, genre, feature, platform } = useContext(GameContext);
  const limit = 40;

  useEffect(() => {
    getAllGames(page, limit, genre, feature, platform);
  }, [page]);
  return (
    <>
      <Meta title="Discover Games" />
      <div className="game-wrapper">
        <div className="container">
          {/* <section className="genre-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <h3>Genre</h3>
                <BtnSlider />
              </div>
              <GenreCard />
              <GenreCard />
              <GenreCard />
              <GenreCard />
            </div>
          </section> */}
          {/* <section className="sort-section mt-3 py-4"> */}
          {/* <div className="row"> */}
          {/* <div className="col-10"> */}
          {/* <div className="row">
                <div className="col-12 sort d-flex gap-2 align-items-center">
                  <span>Show: </span>
                  <Select checkIconPosition="right" placeholder="Pick value" data={sort} defaultValue={sort[1]} allowDeselect={false} />
                </div>
              </div> */}
          <div className="row mx-sm-0 mx-2">
            {loading
              ? Array.from({ length: limit }).map((_, index) => (
                  <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                    <Skeleton height={300} radius="md" key={index} className="my-3" />
                  </div>
                ))
              : games.map((game, index) => <GameCard page="game" data={game} key={index} />)}
          </div>
          {/* </div> */}
          {/* <div className="col-2">
              <div className="filters d-flex flex-column gap-3">
                <span>Filters</span>
                <input className="filter form-control me-2" type="text" placeholder="Keyword" aria-label="Search" />
                <div className="d-flex flex-column gap-2">
                  <Select checkIconPosition="right" placeholder="Genre" data={filterByGenre} defaultValue={sort[1]} />
                  <Select checkIconPosition="right" placeholder="Features" data={filterByFeatures} defaultValue={sort[1]} />
                  <Select checkIconPosition="right" placeholder="Platform" data={filterByPlatform} defaultValue={sort[1]} />
                </div>
              </div>
            </div> */}
          {/* </div> */}
          {/* </section> */}
          <div className="d-flex justify-content-center align-items-center">
            <Pagination total={totalPages} value={page} onChange={setPage} mt="xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
