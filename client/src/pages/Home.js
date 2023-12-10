import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/NavbarHeader";
import Slideshow from "../components/Slideshow";
import NavbarMain from "../components/Navbar";
import GamesOnSale from "../components/Home/GamesOnSaleSection";
import TopSellers from "../components/Home/TopSellersSection";
import MostPlayed from "../components/Home/MostPlayedSection";
import TopUpcomingWishlisted from "../components/Home/TopUpcomingWishlistedSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <NavbarMain />
        <Slideshow />
        <main className="text-light">
          <GamesOnSale />
          <section className="d-flex mt-5">
            <TopSellers />
            <MostPlayed />
            <TopUpcomingWishlisted />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
