import React, { useContext, useEffect } from "react";
import Meta from "../components/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import GameCard from "../components/GameCard";
import BtnSlider from "../components/BtnSlider";
import { GameContext } from "../context/GameContext";
import { Link } from "react-router-dom";

const user = JSON.parse(sessionStorage.getItem("user"));

const Home = () => {
  const { fetchAllGames, games, loading } = useContext(GameContext);
  const limit = 4;

  useEffect(() => {
    fetchAllGames(null, limit);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleAddToWishlist = () => {
    if (!user) {
      location.href = "/login";
      return;
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
                      <img src={game.images.reverse()[0]?.url} alt="" className="img-fluid" />
                    </div>
                    <div className="col-4">
                      <div className="d-flex flex-wrap gap-3">
                        {game.images.slice(0, 4).reverse().map((image, index) => (
                          <>
                            <button className="border-0" key={index}>
                              <img src={image.url} alt={image.url} className="img-fluid" />
                            </button>
                          </>
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
                          <button className="btn btn-outline-light" onClick={handleAddToWishlist}>
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
                <h3 className="section-heading">Sedang Diskon</h3>
                <BtnSlider />
              </div>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="row">
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="row">
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="row">
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="row">
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
          <section className="top-seller-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Penjualan Teratas</h3>
                <a href="/collection/top-sellers" className="btn btn-outline-light">
                  Lihat Semua
                </a>
              </div>
              {games.map((game) => (
                <GameCard page="home" data={game} key={game._id} />
              ))}
            </div>
          </section>
          <section className="most-played-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Paling Banyak Dimainkan</h3>
                <a href="/collection/most-played" className="btn btn-outline-light">
                  Lihat Semua
                </a>
              </div>
              {games.map((game) => (
                <GameCard page="home" data={game} key={game._id} />
              ))}
            </div>
          </section>
          <section className="upcoming-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Segera Hadir</h3>
                <a href="/collection/upcoming" className="btn btn-outline-light">
                  Lihat Semua
                </a>
              </div>
              {games.map((game) => (
                <GameCard page="home" data={game} key={game._id} />
              ))}
            </div>
          </section>
          <section className="trending-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Sedang Tren</h3>
                <a href="/collection/trending" className="btn btn-outline-light">
                  Lihat Semua
                </a>
              </div>
              {games.map((game) => (
                <GameCard page="home" data={game} key={game._id} />
              ))}
            </div>
          </section>
          <section className="new-release-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Keluaran Terbaru</h3>
                <a href="/collection/new-release" className="btn btn-outline-light">
                  Lihat Semua
                </a>
              </div>
              {games.map((game) => (
                <GameCard page="home" data={game} key={game._id} />
              ))}
            </div>
          </section>
          <section className="most-popular-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Paling Populer</h3>
              </div>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="row">
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="row">
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
          <section className="recently-updated-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Baru-baru ini Diperbarui</h3>
              </div>
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div className="row">
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="row">
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                    <GameCard discount={true} />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
