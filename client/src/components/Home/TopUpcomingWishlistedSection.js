import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const TopUpcomingWishlisted = () => {
  const [games, setGames] = useState([]);
  const limit = 5;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/games/top-sellers`);
        const data = await response.data;
        setGames(data.slice(0, limit));
      } catch (error) {
        console.error("Error fetching top sellers games:", error);
      }
    };

    fetchGames();
  }, [limit]);

  const CardAnchor = styled.a`
    &:hover {
      background-color: #2a2a2a;
    }
  `;

  return (
    <>
      <section className="mb-4 border-end pe-3 container mt-5">
        <div className="d-flex justify-content-between mb-4 align-items-center">
          <h4>Top Upcoming Wishlisted</h4>
          <Link to={"/games/sale"} className="btn btn-outline-light">
            View More
          </Link>
        </div>
        <div className="d-flex flex-column gap-3 mb-2">
          {games.map((game) => (
            <CardAnchor to={`/games/${game.title}`} className="btn text-light">
              <div className="d-flex align-items-center gap-3">
                <img src={game.image} alt="" style={{ width: 96 + "px", height: 128 + "px" }} />
                <div className="d-flex flex-column">
                  <h6 className="text-start">{game.title}</h6>
                  <p className="text-start">IDR {game.price.toLocaleString()}</p>
                </div>
              </div>
            </CardAnchor>
          ))}
        </div>
      </section>
    </>
  );
};

export default TopUpcomingWishlisted;
