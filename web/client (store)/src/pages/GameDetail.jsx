import React from "react";
import Meta from "../components/Meta";
import { FaShoppingCart, FaHeart, FaWindows, FaApple } from "react-icons/fa";

const GameDetail = () => {
  return (
    <>
      <Meta title="Football Manager 2024" />
      <div className="game-detail-wrapper">
        <div className="container">
          <h1>Football Manager 2024</h1>
          <div className="row mt-4">
            <div className="col-8">
              <div className="img-gallery-wrapper">
                <div className="img-gallery">
                  <img src="https://cdn2.unrealengine.com/egs-footballmanager2024-sportsinteractive-g1a-00-1920x1080-33e101aa744d.jpg" alt="" className="img-fluid img-gallery-hero" />
                  <div className="img-gallery-items d-flex flex-wrap gap-3 mt-3 justify-content-center align-items-center">
                    <img src="https://cdn2.unrealengine.com/egs-footballmanager2024-sportsinteractive-g1a-00-1920x1080-33e101aa744d.jpg?h=270&quality=medium&resize=1&w=480" alt="" className="img-fluid img-gallery-item" />
                    <img src="https://cdn2.unrealengine.com/egs-footballmanager2024-sportsinteractive-g1a-00-1920x1080-33e101aa744d.jpg?h=270&quality=medium&resize=1&w=480" alt="" className="img-fluid img-gallery-item" />
                    <img src="https://cdn2.unrealengine.com/egs-footballmanager2024-sportsinteractive-g1a-00-1920x1080-33e101aa744d.jpg?h=270&quality=medium&resize=1&w=480" alt="" className="img-fluid img-gallery-item" />
                    <img src="https://cdn2.unrealengine.com/egs-footballmanager2024-sportsinteractive-g1a-00-1920x1080-33e101aa744d.jpg?h=270&quality=medium&resize=1&w=480" alt="" className="img-fluid img-gallery-item" />
                    <img src="https://cdn2.unrealengine.com/egs-footballmanager2024-sportsinteractive-g1a-00-1920x1080-33e101aa744d.jpg?h=270&quality=medium&resize=1&w=480" alt="" className="img-fluid img-gallery-item" />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-around my-5">
                <div className="genres">
                  <h5>Genre</h5>
                  <div className="genre-items">
                    <a href="">Simulation</a>
                  </div>
                </div>
                <div className="features">
                  <h5>Feature</h5>
                  <div className="feature-items d-flex gap-3">
                    <a href="">Achievements</a>
                    <a href="">Achievements</a>
                    <a href="">Achievements</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 mx-auto">
              <div className="game-image-original mt-3 text-center">
                <img src="https://cdn2.unrealengine.com/egs-footballmanager2024-sportsinteractive-ic1-400x400-5d6415a86251.png?h=270&quality=medium&resize=1&w=480" alt="" className="img-fluid" />
              </div>
              <p className="game-price fw-bold text-center">IDR 649,999</p>
              <div className="action-btn d-flex flex-column gap-3 w-75 mx-auto">
                <button className="btn btn-success w-100">Beli Sekarang</button>
                <button className="btn btn-outline-light w-100 d-flex align-items-center gap-2 justify-content-center">
                  <FaShoppingCart />
                  <span>Tambah ke Keranjang</span>
                </button>
                <button className="btn btn-outline-light w-100 d-flex align-items-center gap-2 justify-content-center">
                  <FaHeart />
                  <span>Tambah ke Wishlist</span>
                </button>
              </div>
              <div className="d-flex flex-column mt-4 gap-2">
                <div className="developer d-flex justify-content-between align-items-center border-bottom p-2">
                  <span className="developer">Developer</span>
                  <span className="developer-name">Sports Interactive</span>
                </div>
                <div className="publisher d-flex justify-content-between align-items-center border-bottom p-2">
                  <span className="publisher">Publisher</span>
                  <span className="publisher-name">SEGA</span>
                </div>
                <div className="release-date d-flex justify-content-between align-items-center border-bottom p-2">
                  <span className="release-date">Release Date</span>
                  <span className="release-date-info">11/06/23</span>
                </div>
                <div className="platform d-flex justify-content-between align-items-center border-bottom p-2">
                  <span className="platform">Platform</span>
                  <div className="platform-support d-flex align-items-center gap-2">
                    <FaWindows />
                    <FaApple />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetail;
