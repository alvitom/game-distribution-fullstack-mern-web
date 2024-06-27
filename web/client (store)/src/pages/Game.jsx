import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";
import { Pagination } from "@mantine/core";

const Game = () => {
  const { fetchAllGames, page, setPage, games, loading, totalPages, genre, feature, platform } = useContext(GameContext);
  const limit = 40;

  useEffect(() => {
    fetchAllGames(page, limit, genre, feature, platform);
  }, [page]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Meta title="Game Terbaru" />
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
          <div className="row">
            {games.map((game) => (
              <GameCard page="game" data={game} key={game._id} />
            ))}
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
