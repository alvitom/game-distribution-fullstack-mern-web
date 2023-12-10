import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GamesOnSale from "./pages/GamesOnSale";
import TopSellers from "./pages/TopSellers";
import GameDetail from "./pages/GameDetail";
import styled from "styled-components";

const App = () => {
  const BackgroundColor = styled.body`
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 18px;
    background-color: rgb(18, 18, 18);
    color: rgb(204, 204, 204);
  `;
  return (
    <>
      <BackgroundColor>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/promotions" element={<GamesOnSale />} />
            <Route exact path="/games/top-sellers" element={<TopSellers />} />
            <Route exact path="/games/:gameTitle" element={<GameDetail />} />
          </Routes>
        </Router>
      </BackgroundColor>
    </>
  );
}

export default App;
