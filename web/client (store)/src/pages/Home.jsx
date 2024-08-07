import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import GameCard from "../components/GameCard";
import { GameContext } from "../context/GameContext";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { notifications } from "@mantine/notifications";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Skeleton } from "@mantine/core";

const user = JSON.parse(sessionStorage.getItem("user"));

const Home = () => {
  const {
    getAllGames,
    games,
    getSaleGames,
    saleGames,
    getTopSellerGames,
    topSellerGames,
    getMostPlayedGames,
    mostPlayedGames,
    getNewReleaseGames,
    newReleaseGames,
    getTrendingGames,
    trendingGames,
    getUpcomingGames,
    upcomingGames,
    loading,
  } = useContext(GameContext);
  const { addWishlist, wishlists, setWishlists } = useContext(WishlistContext);
  const limitCarousel = 4;
  const limitCollection = 6;

  useEffect(() => {
    getAllGames(null, limitCarousel);
    getSaleGames(limitCollection);
    getTopSellerGames(limitCollection);
    getMostPlayedGames(limitCollection);
    getNewReleaseGames(limitCollection);
    getTrendingGames(limitCollection);
    getUpcomingGames(limitCollection);
  }, []);

  const handleAddToWishlist = async (gameId) => {
    if (!user) {
      location.href = "/login";
      return;
    }
    const response = await addWishlist({ gameId });
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
      <Meta title="Download & Play Games" />
      <div className="home-wrapper">
        <div className="container">
          {loading ? (
            <section className="carousel-section py-4">
              <Skeleton height={350} radius="md" />
            </section>
          ) : (
            <section className="carousel-section py-4">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
              >
                {games.map((game, index) => (
                  <SwiperSlide key={index}>
                    <div className="carousel-wrapper row mx-sm-0 mx-2">
                      <div className="col-lg-8 col-12">
                        <img src={game.coverImage?.eager[2].url} alt={game.title} className="img-fluid" />
                      </div>
                      <div className="col-lg-4 col-12 mt-4 mt-lg-0">
                        <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                          {game.images
                            .slice(0, 4)
                            .reverse()
                            .map((image, index) => (
                              <img src={image.url} alt={image.url} className="img-fluid col-2 col-lg-4" key={index} />
                            ))}
                        </div>
                        <div className="details d-flex flex-column justify-content-between mt-4">
                          <h3 className="text-start mb-2">{game.title}</h3>
                          <p className="text-start">{game.description}</p>
                          <p className="text-start price">
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                              minimumFractionDigits: 0,
                            }).format(game.price)}
                          </p>
                          <div className="btn-action d-flex gap-3">
                            <Link to={`/game/${game.slug}`} className="btn btn-success">
                              Beli Sekarang
                            </Link>
                            <button className="btn btn-outline-light" onClick={() => handleAddToWishlist(game._id)}>
                              Tambah ke Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          )}
          <section className="discount-section py-4">
            <div className="row mx-sm-0 mx-2">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3 className="section-heading">Games On Sale</h3>
                <a href="/collection/sale" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {loading
                ? Array.from({ length: limitCollection }).map((_, index) => (
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                      <Skeleton height={300} radius="md" key={index} className="my-lg-0 my-3" />
                    </div>
                  ))
                : saleGames.map((game, index) => <GameCard key={index} data={game} />)}
            </div>
          </section>
          <section className="top-seller-section py-4">
            <div className="row mx-sm-0 mx-2">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Top Sellers</h3>
                <a href="/collection/top-sellers" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {loading
                ? Array.from({ length: limitCollection }).map((_, index) => (
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                      <Skeleton height={300} radius="md" key={index} className="my-lg-0 my-3" />
                    </div>
                  ))
                : topSellerGames.map((game, index) => <GameCard page="home" data={game} key={index} />)}
            </div>
          </section>
          <section className="most-played-section py-4">
            <div className="row mx-sm-0 mx-2">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Most Played</h3>
                <a href="/collection/most-played" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {loading
                ? Array.from({ length: limitCollection }).map((_, index) => (
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                      <Skeleton height={300} radius="md" key={index} className="my-lg-0 my-3" />
                    </div>
                  ))
                : mostPlayedGames.map((game, index) => <GameCard page="home" data={game} key={index} />)}
            </div>
          </section>
          <section className="upcoming-section py-4">
            <div className="row mx-sm-0 mx-2">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Upcoming</h3>
                <a href="/collection/upcoming" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {loading
                ? Array.from({ length: limitCollection }).map((_, index) => (
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                      <Skeleton height={300} radius="md" key={index} className="my-lg-0 my-3" />
                    </div>
                  ))
                : upcomingGames.map((game, index) => <GameCard page="home" data={game} key={index} />)}
            </div>
          </section>
          <section className="trending-section py-4">
            <div className="row mx-sm-0 mx-2">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Trending</h3>
                <a href="/collection/trending" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {loading
                ? Array.from({ length: limitCollection }).map((_, index) => (
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                      <Skeleton height={300} radius="md" key={index} className="my-lg-0 my-3" />
                    </div>
                  ))
                : trendingGames.map((game, index) => <GameCard page="home" data={game} key={index} />)}
            </div>
          </section>
          <section className="new-release-section py-4">
            <div className="row mx-sm-0 mx-2">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>New Release</h3>
                <a href="/collection/new-release" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {loading
                ? Array.from({ length: limitCollection }).map((_, index) => (
                    <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                      <Skeleton height={300} radius="md" key={index} className="my-lg-0 my-3" />
                    </div>
                  ))
                : newReleaseGames.map((game, index) => <GameCard page="home" data={game} key={index} />)}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
