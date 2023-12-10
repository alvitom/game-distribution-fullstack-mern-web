import React, { useEffect, useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/NavbarHeader";
import NavbarMain from "../components/Navbar";
import { CardImage, CardAnchor, InfoPrice, DiscPerc, Price, OldPrice } from "../components/CardSale";

const GamesOnSale = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/promotions`);
        const discounts = await response.data;

        const discountedGameIds = discounts.map((discount) => discount.game_id);
        // setGames(discountedGameIds.slice(0, limit));

        // Mengambil data game yang sesuai dengan ID yang sedang diskon
        const gamesResponse = await axios.get("http://localhost:5000/games", {
          params: {
            ids: discountedGameIds.join(","),
          },
        });
        const games = gamesResponse.data;

        // Menggabungkan data game dan diskon, dan menghitung harga setelah diskon
        const mergedData = games
          .map((game) => {
            const discount = discounts.find((discount) => discount.game_id === game._id);

            // Hanya memasukkan data diskon yang masih aktif
            if (discount && new Date(discount.end_date) > new Date()) {
              const discountedPrice = calculateDiscountedPrice(game.price, discount.discount);
              return {
                ...game,
                discount,
                discountedPrice,
              };
            }

            return null; // Filter data yang tidak aktif
          })
          .filter(Boolean); // Menghapus elemen null dari array

        setGames(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGames();
  }, []);

  // Fungsi untuk menghitung harga setelah diskon
  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    return Math.floor(originalPrice - discountAmount);
  };

  return (
    <>
      <Navbar />
      <NavbarMain />
      <div className="container mt-5">
        <h1 className="text-center mb-5">
          <strong>Games On Sale</strong>
        </h1>
        <div className="row">
          {games.map((game) => (
            <div className="col-md mb-5">
              <CardAnchor key={game._id}>
                <CardImage src={game.image} alt={game.title} />
                <h5>{game.title}</h5>
                <InfoPrice>
                  <DiscPerc>
                    <span>-{game.discount.discount}%</span>
                  </DiscPerc>
                  <Price>
                    <OldPrice>IDR {game.price.toLocaleString()}</OldPrice>
                    <span>IDR {game.discountedPrice.toLocaleString()}</span>
                  </Price>
                </InfoPrice>
              </CardAnchor>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GamesOnSale;
