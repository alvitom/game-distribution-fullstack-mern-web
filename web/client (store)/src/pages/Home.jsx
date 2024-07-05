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

const user = JSON.parse(sessionStorage.getItem("user"));

const Home = () => {
  const {
    fetchAllGames,
    games,
    fetchSaleGames,
    saleGames,
    fetchTopSellerGames,
    topSellerGames,
    fetchMostPlayedGames,
    mostPlayedGames,
    fetchNewReleaseGames,
    newReleaseGames,
    fetchTrendingGames,
    trendingGames,
    fetchUpcomingGames,
    upcomingGames,
    loading,
  } = useContext(GameContext);
  const { addWishlist, wishlists, setWishlists } = useContext(WishlistContext);
  const limitCarousel = 4;
  const limitCollection = 6;

  useEffect(() => {
    fetchAllGames(null, limitCarousel);
    fetchSaleGames(limitCollection);
    fetchTopSellerGames(limitCollection);
    fetchMostPlayedGames(limitCollection);
    fetchNewReleaseGames(limitCollection);
    fetchTrendingGames(limitCollection);
    fetchUpcomingGames(limitCollection);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

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
      <Meta title="Selamat Datang" />
      <div className="home-wrapper">
        <div className="container">
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
                  <div className="carousel-wrapper row">
                    <div className="col-8">
                      <img src={game.coverImage?.eager[2].url} alt={game.title} className="img-fluid" />
                    </div>
                    <div className="col-4">
                      <div className="d-flex flex-wrap gap-3">
                        {game.images
                          .slice(0, 4)
                          .reverse()
                          .map((image, index) => (
                            <img src={image.url} alt={image.url} className="img-fluid" key={index} />
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
          <section className="discount-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3 className="section-heading">Games On Sale</h3>
                <a href="/collection/sale" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {saleGames.map((game, index) => (
                <GameCard key={index} data={game} />
              ))}
            </div>
          </section>
          <section className="top-seller-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Top Sellers</h3>
                <a href="/collection/top-sellers" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {topSellerGames.map((game) => (
                <GameCard page="home" data={game} key={game._id} />
              ))}
            </div>
          </section>
          <section className="most-played-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Most Played</h3>
                <a href="/collection/most-played" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {mostPlayedGames.map((game) => (
                <GameCard page="home" data={game} key={game._id} />
              ))}
            </div>
          </section>
          <section className="upcoming-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Upcoming</h3>
                <a href="/collection/upcoming" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {upcomingGames.map((game) => (
                <GameCard page="home" data={game} key={game._id} />
              ))}
            </div>
          </section>
          <section className="trending-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Trending</h3>
                <a href="/collection/trending" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {trendingGames.map((game) => (
                <GameCard page="home" data={game} key={game._id} />
              ))}
            </div>
          </section>
          <section className="new-release-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>New Release</h3>
                <a href="/collection/new-release" className="btn btn-outline-light">
                  View More
                </a>
              </div>
              {newReleaseGames.map((game) => (
                <GameCard page="home" data={game} key={game._id} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
