import React from "react";
import Meta from "../components/Meta";
import { FaShoppingCart, FaHeart, FaWindows, FaApple } from "react-icons/fa";
import { Tabs } from "@mantine/core";
import { imgGallery, imgGalleryHero } from "../utils/Data";

const user = JSON.parse(sessionStorage.getItem("user"));

const GameDetail = () => {
  const handleCheckout = () => {
    if (!user) {
      location.href = "/login";
      return;
    }
    location.href = "/checkout";
  };
  const handleAddToCart = () => {
    if (!user) {
      location.href = "/login";
      return;
    }
  };
  const handleAddToWishlist = () => {
    if (!user) {
      location.href = "/login";
      return;
    }
  };
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
                  <img src={imgGalleryHero} alt="" className="img-fluid img-gallery-hero" />
                  <div className="img-gallery-items d-flex flex-wrap gap-3 mt-3 justify-content-center align-items-center">
                    {imgGallery.map((img) => (
                      <button className="border-0" key={img}>
                        <img src={img} alt="" className="img-fluid img-gallery-item" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <p className="game-description mt-5">Craft a world-class team ready to dominate your rivals in football’s most prestigious competitions. Progress never stops when you’re pursuing footballing greatness.</p>
              <div className="d-flex justify-content-around my-5 genres-features">
                <div className="genres">
                  <h5>Genre</h5>
                  <div className="genre-items">Simulation</div>
                </div>
                <div className="features">
                  <h5>Feature</h5>
                  <div className="feature-items">Achievements, Multiplayer, Single Player</div>
                </div>
              </div>
              <div className="system-requirements">
                <Tabs color="#198754" defaultValue="windows">
                  <Tabs.List grow>
                    <Tabs.Tab value="windows" leftSection={<FaWindows />}>
                      Windows
                    </Tabs.Tab>
                    <Tabs.Tab value="mac-os" leftSection={<FaApple />}>
                      Mac OS
                    </Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="windows">
                    <div className="row">
                      <div className="col-6">
                        <span>Minimum</span>
                        <div className="mt-3 d-flex flex-column gap-3">
                          <div className="d-flex flex-column ">
                            <span>OS</span>
                            <span className="value">Windows 10/11 with updates - 64 bit</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Processor</span>
                            <span className="value">Intel Core 2 or AMD Athlon 64 X2</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Memory</span>
                            <span className="value">4 GB</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Storage</span>
                            <span className="value">7 GB</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Graphics</span>
                            <span className="value">Intel GMA X4500, NVIDIA GeForce 9600M GT, AMD/ATI Mobility Radeon HD 3650 - requires 256MB VRAM</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>DirectX</span>
                            <span className="value">DirectX® 11</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <span>Recommended</span>
                        <div className="mt-3 d-flex flex-column gap-3">
                          <div className="d-flex flex-column ">
                            <span>OS</span>
                            <span className="value">Windows 10/11 with updates - 64 bit</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Processor</span>
                            <span className="value">Intel Core 2 or AMD Athlon 64 X2</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Memory</span>
                            <span className="value">4 GB</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Storage</span>
                            <span className="value">7 GB</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Graphics</span>
                            <span className="value">Intel GMA X4500, NVIDIA GeForce 9600M GT, AMD/ATI Mobility Radeon HD 3650 - requires 256MB VRAM</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>DirectX</span>
                            <span className="value">DirectX® 11</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tabs.Panel>

                  <Tabs.Panel value="mac-os">
                    <div className="row">
                      <div className="col-6">
                        <span>Minimum</span>
                        <div className="mt-3 d-flex flex-column gap-3">
                          <div className="d-flex flex-column ">
                            <span>OS</span>
                            <span className="value">11/12/13 with updates</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Processor</span>
                            <span className="value">Apple M1 or Intel Core M</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Memory</span>
                            <span className="value">4 GB</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Storage</span>
                            <span className="value">7 GB</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Graphics</span>
                            <span className="value">Apple M1, Intel HD Graphics 5000, NVIDIA GeForce GT 750M - requires 256MB VRAM and Metal</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <span>Recommended</span>
                        <div className="mt-3 d-flex flex-column gap-3">
                          <div className="d-flex flex-column">
                            <span>OS</span>
                            <span className="value">11/12/13 with updates</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Processor</span>
                            <span className="value">Apple M1 or Intel Core M</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Memory</span>
                            <span className="value">4 GB</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Storage</span>
                            <span className="value">7 GB</span>
                          </div>
                          <div className="d-flex flex-column ">
                            <span>Graphics</span>
                            <span className="value">Apple M1, Intel HD Graphics 5000, NVIDIA GeForce GT 750M - requires 256MB VRAM and Metal</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tabs.Panel>
                </Tabs>
              </div>
            </div>
            <div className="col-4 mx-auto">
              <div className="game-image-original mt-3 text-center">
                <img src="https://cdn2.unrealengine.com/egs-footballmanager2024-sportsinteractive-ic1-400x400-5d6415a86251.png?h=270&quality=medium&resize=1&w=480" alt="" className="img-fluid" />
              </div>
              <p className="game-price fw-bold text-center">IDR 649,999</p>
              <div className="action-btn d-flex flex-column gap-3 w-75 mx-auto">
                <button className="btn btn-success w-100" onClick={handleCheckout}>
                  Beli Sekarang
                </button>
                <button className="btn btn-outline-light w-100 d-flex align-items-center gap-2 justify-content-center" onClick={handleAddToCart}>
                  <FaShoppingCart />
                  <span>Tambah ke Keranjang</span>
                </button>
                <button className="btn btn-outline-light w-100 d-flex align-items-center gap-2 justify-content-center" onClick={handleAddToWishlist}>
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
