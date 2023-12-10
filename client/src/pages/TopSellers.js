import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/NavbarHeader.js";
import NavbarMain from "../components/Navbar.js";
import { CardImage, CardAnchor, InfoPrice, DiscPerc, Price, OldPrice } from "../components/CardSale.js";

const TopSellers = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/games/top-sellers");
        const data = await response.data;
        setGames(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <NavbarMain />
      <div className="container mt-5">
        <h1 className="text-center mb-5">
          <strong>Top Sellers</strong>
        </h1>
        <div className="row">
          {games.map((game) => (
            <div className="col-md mb-5">
              <CardAnchor key={game._id}>
                <CardImage src={game.image} alt={game.title} />
                <h5>{game.title}</h5>
                <Price>IDR {game.price.toLocaleString()}</Price>
              </CardAnchor>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopSellers;
