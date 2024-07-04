import React, { useContext, useEffect, useState } from "react";
import Meta from "../components/Meta";
import { FaShoppingCart, FaHeart, FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { Tabs } from "@mantine/core";
import { GameContext } from "../context/GameContext";
import { useNavigate, useParams } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { notifications } from "@mantine/notifications";
import { MdClose } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { CheckoutContext } from "../context/CheckoutContext";

const user = JSON.parse(sessionStorage.getItem("user"));

const GameDetail = () => {
  const { title } = useParams();
  const { selectedGame, totalNetPrice, totalDiscount, newPrice, serviceFee, totalPrice, fetchGame } = useContext(GameContext);
  const { addWishlist, wishlists, setWishlists } = useContext(WishlistContext);
  const { addCart, carts, setCarts } = useContext(CartContext);
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [startImage, setStartImage] = useState(0);
  const { setCheckout } = useContext(CheckoutContext);
  const navigate = useNavigate();

  const imagesPerSlide = 7;

  useEffect(() => {
    fetchGame(title);
  }, [title]);

  useEffect(() => {
    if (selectedGame) {
      setImages(selectedGame?.images.slice().reverse());
    }
  }, [selectedGame]);

  const handleImageClick = (index) => {
    setActiveImage(index);
  };

  const handleNext = () => {
    if (startImage + imagesPerSlide < images.length) {
      setStartImage(startImage + imagesPerSlide);
    }
  };

  const handlePrev = () => {
    if (startImage - imagesPerSlide >= 0) {
      setStartImage(startImage - imagesPerSlide);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      location.href = "/login";
      return;
    }
    const summary = {
      items: [selectedGame],
      prices: selectedGame.discount.isActive
        ? {
            totalNetPrice,
            totalDiscount,
            totalPrice: newPrice,
            serviceFee,
            total: totalPrice,
          }
        : {
            totalPrice: totalNetPrice,
            serviceFee,
            total: totalPrice,
          },
    };
    setCheckout(summary);
    navigate("/checkout");
  };
  const handleAddToCart = async () => {
    if (!user) {
      location.href = "/login";
      return;
    }
    const gameId = {
      gameId: selectedGame._id,
    };
    const response = await addCart(gameId);
    if (!response.success) {
      return notifications.show({
        message: response.message,
        color: "blue",
        withCloseButton: false,
        icon: <MdClose />,
      });
    } else {
      setCarts([response.data, ...carts]);
      return notifications.show({
        message: response.message,
        color: "green",
        withCloseButton: false,
        icon: <FaCheck />,
      });
    }
  };
  const handleAddToWishlist = async () => {
    if (!user) {
      location.href = "/login";
      return;
    }
    const gameId = {
      gameId: selectedGame._id,
    };
    const response = await addWishlist(gameId);
    if (!response.success) {
      return notifications.show({
        message: response.message,
        color: "blue",
        withCloseButton: false,
        icon: <MdClose />,
      });
    } else {
      setWishlists([response.data, ...wishlists]);
      return notifications.show({
        message: response.message,
        color: "green",
        withCloseButton: false,
        icon: <FaCheck />,
      });
    }
  };
  return (
    <>
      <Meta title={`${selectedGame?.title}`} />
      <div className="game-detail-wrapper">
        <div className="container">
          <h1>{selectedGame?.title}</h1>
          <div className="row mt-4">
            <div className="col-8">
              <div className="img-gallery-wrapper">
                <div className="img-gallery">
                  <img src={images[activeImage]?.url} alt="Hero" className="img-fluid img-gallery-hero" />
                  <div className="img-gallery-container">
                    <button className="scroll-button left" onClick={handlePrev}>
                      &lt;
                    </button>
                    <div className="img-gallery-items d-flex gap-3 justify-content-center align-items-center">
                      {images.slice(startImage, startImage + imagesPerSlide)?.map((image, index) => (
                        <button className="border-0" key={index} onClick={() => handleImageClick(startImage + index)}>
                          <img src={image.url} alt={`Image ${index + 1}`} className={startImage + index === activeImage ? "img-fluid img-gallery-item active" : "img-fluid img-gallery-item"} />
                        </button>
                      ))}
                    </div>
                    <button className="scroll-button right" onClick={handleNext}>
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
              <p className="game-description mt-5">{selectedGame?.description}</p>
              <div className="d-flex justify-content-around my-5 genres-features">
                <div className="genres">
                  <h5>Genre</h5>
                  <div className="genre-items">{selectedGame?.genres.map((item) => item.genre).join(", ")}</div>
                </div>
                <div className="features">
                  <h5>Feature</h5>
                  <div className="feature-items">{selectedGame?.features.map((item) => item.feature).join(", ")}</div>
                </div>
              </div>
              <div className="system-requirements">
                <Tabs color="#198754" defaultValue="windows">
                  <Tabs.List grow>
                    {selectedGame?.platform.includes("Windows") && (
                      <Tabs.Tab value="windows" leftSection={<FaWindows />}>
                        Windows
                      </Tabs.Tab>
                    )}
                    {selectedGame?.platform.includes("Mac OS") && (
                      <Tabs.Tab value="mac-os" leftSection={<FaApple />}>
                        Mac OS
                      </Tabs.Tab>
                    )}
                    {selectedGame?.platform.includes("Linux") && (
                      <Tabs.Tab value="linux" leftSection={<FaLinux />}>
                        Linux
                      </Tabs.Tab>
                    )}
                  </Tabs.List>

                  {selectedGame?.platform.includes("Windows") && (
                    <Tabs.Panel value="windows">
                      <div className="row">
                        <div className="col-6">
                          <span>Minimum</span>
                          <div className="mt-3 d-flex flex-column gap-3">
                            <div className="d-flex flex-column ">
                              <span>OS</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.minimum.os}</span>
                            </div>
                            <div className="d-flex flex-column ">
                              <span>Processor</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.minimum.processor}</span>
                            </div>
                            <div className="d-flex flex-column ">
                              <span>Memory</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.minimum.memory}</span>
                            </div>
                            <div className="d-flex flex-column ">
                              <span>Storage</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.minimum.storage}</span>
                            </div>
                            <div className="d-flex flex-column ">
                              <span>Graphics</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.minimum.graphics}</span>
                            </div>
                            <div className="d-flex flex-column ">
                              <span>DirectX</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.minimum.directX}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <span>Recommended</span>
                          <div className="mt-3 d-flex flex-column gap-3">
                            <div className="d-flex flex-column ">
                              <span>OS</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.recommended.os}</span>
                            </div>
                            <div className="d-flex flex-column ">
                              <span>Processor</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.recommended.processor}</span>
                            </div>
                            <div className="d-flex flex-column ">
                              <span>Memory</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.recommended.memory}</span>
                            </div>
                            <div className="d-flex flex-column ">
                              <span>Storage</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.recommended.storage}</span>
                            </div>
                            <div className="d-flex flex-column ">
                              <span>Graphics</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.recommended.graphics}</span>
                            </div>
                            <div className="d-flex flex-column ">
                              <span>DirectX</span>
                              <span className="value">{selectedGame?.systemRequirements.windows.recommended.directX}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tabs.Panel>
                  )}

                  {selectedGame?.platform.includes("Mac OS") && (
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
                  )}

                  {selectedGame?.platform.includes("Linux") && (
                    <Tabs.Panel value="linux">
                      <div className="row">
                        <div className="col-6">
                          <span>Minimum</span>
                          <div className="mt-3 d-flex flex-column gap-3">
                            <div className="d-flex flex-column ">
                              <span>OS</span>
                              <span className="value">Linux</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <span>Recommended</span>
                          <div className="mt-3 d-flex flex-column gap-3">
                            <div className="d-flex flex-column ">
                              <span>OS</span>
                              <span className="value">Linux</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tabs.Panel>
                  )}
                </Tabs>
              </div>
            </div>
            <div className="col-4 mx-auto">
              <div className="game-image-original mt-3 text-center">
                <img src={selectedGame?.coverImage.url} alt={selectedGame?.coverImage.original_filename} className="img-fluid" />
              </div>
              {selectedGame?.discount.isActive ? (
                <div className="discount d-flex flex-column align-items-center my-4 gap-3">
                  <div className="price d-flex align-items-center justify-content-center gap-3">
                    <span className="badge bg-success p-2 fs-6">-{selectedGame?.discount.percentage}%</span>
                    <h5 className="old-price text-decoration-line-through text-secondary mb-0">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(selectedGame?.price)}
                    </h5>
                    <h5 className="new-price mb-0">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(newPrice)}
                    </h5>
                  </div>
                  <div className="end-date">
                    <span>Sale ends at {new Date(selectedGame?.discount.endDate).toLocaleDateString("en-US")}</span>
                  </div>
                </div>
              ) : (
                <h5 className="price text-center my-4">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(selectedGame?.price)}
                </h5>
              )}
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
                  <span className="developer-name">{selectedGame?.developer}</span>
                </div>
                <div className="publisher d-flex justify-content-between align-items-center border-bottom p-2">
                  <span className="publisher">Publisher</span>
                  <span className="publisher-name">{selectedGame?.publisher}</span>
                </div>
                <div className="release-date d-flex justify-content-between align-items-center border-bottom p-2">
                  <span className="release-date">Release Date</span>
                  <span className="release-date-info">
                    {new Date(selectedGame?.releaseDate).toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </div>
                <div className="platform d-flex justify-content-between align-items-center border-bottom p-2">
                  <span className="platform">Platform</span>
                  <div className="platform-support d-flex align-items-center gap-2">
                    {selectedGame?.platform.map((item, index) => (item === "Windows" ? <FaWindows key={index} /> : item === "Mac OS" ? <FaApple key={index} /> : item === "Linux" ? <FaLinux key={index} /> : null))}
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
