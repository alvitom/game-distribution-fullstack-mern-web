import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavbarHeader";
import axios from "axios";

const GameDetail = () => {
  const { gameTitle } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/games/${gameTitle}`);
        const data = await response.data;
        setGame(data);
      } catch (error) {
        console.error("Error fetching game detail:", error);
      }
    };

    fetchGameDetail();
  }, [gameTitle]);

  if (!game) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-5">
        <h1 className="text-center">
          <strong>{game.title}</strong>
        </h1>
        <div className="row">
          <div className="col-md-4 mt-5 ms-5">
            <img src={game.image} className="img-fluid my-3" alt={game.title} />
          </div>
          <div className="col-md-7 mt-4 ms-3">
            <h5 className="mt-4 text-center">Game Details</h5>
            <p className="mt-3">
              <strong>Price :</strong> IDR {game.price.toLocaleString()}
            </p>
            <p className="mt-3">
              <strong>Developer :</strong> {game.developer}
            </p>
            <p className="mt-3">
              <strong>Publisher :</strong> {game.publisher}
            </p>
            <p className="mt-3">
              <strong>Release Date :</strong> {new Date(game.release_date).toLocaleDateString()}
            </p>
            <p className="mt-3">
              <strong>Platform :</strong> {game.platform_support}
            </p>
            <p className="mt-3">
              <strong>Description :</strong> {game.description}
            </p>
            <p className="mt-3">
              <strong>Genres :</strong> {game.genres}
            </p>
            <p className="mt-3">
              <strong>Features :</strong> {game.features}
            </p>
            <div class="d-flex flex-column align-items-center">
              <button onClick="" className="btn btn-primary mt-3 w-50">
                Beli Sekarang
              </button>
              <button onClick="" className="btn btn-outline-dark mt-3 w-50">
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-5 pt-5">
          <div className="col-md-12 text-center">
            <h3>Ulasan Produk</h3>
            <p className="mt-4 ms-3">Rating : {game.rating}</p>
            <gameRating rating={game.rating.rate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetail;
