import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GameDetailPage from "./pages/GameDetailPage";
import GamesOnSalePage from "./pages/GamesOnSalePage";
import TopSellerPage from "./pages/TopSellerPage";
import Footer from "./components/utils/Footer";
import Navbar from "./components/utils/Navbar/Navbar";
import MostPlayedPage from "./pages/MostPlayedPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/game/sale" element={<GamesOnSalePage />} />
        <Route exact path="/game/top_seller" element={<TopSellerPage />} />
        <Route exact path="/game/most_played" element={<MostPlayedPage />} />
        <Route exact path="/game/:gameId" element={<GameDetailPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
