import React from "react";
import Meta from "../components/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import GameCard from "../components/GameCard";
import BtnSlider from "../components/BtnSlider";

const user = JSON.parse(sessionStorage.getItem("user"));

const Home = () => {
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
              <SwiperSlide>
                <div className="carousel-wrapper row">
                  <div className="col-8">
                    <img src="/images/easportsfc24standardedition-eacanada-s1-2560x1440-b8f47ad67d72.avif" alt="" className="img-fluid" />
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-wrap gap-3">
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-03-1920x1080-6f38923efc79.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-04-1920x1080-888c9f17f2e1.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-05-1920x1080-332cc58b6aed.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-06-1920x1080-8799703619bf.avif" alt="" className="img-fluid" />
                      </button>
                    </div>
                    <div className="details d-flex flex-column justify-content-between mt-4">
                      <p className="text-start">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quo perspiciatis nisi optio esse qui in adipisci rem numquam debitis saepe eveniet molestias ipsa a cupiditate consequuntur iste maiores commodi!
                      </p>
                      <p className="text-start price">IDR 300,750</p>
                      <div className="btn-action d-flex gap-3">
                        <a href="/game/id" className="btn btn-success">
                          Beli Sekarang
                        </a>
                        <button className="btn btn-outline-light" onClick={handleAddToWishlist}>
                          Tambah ke Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="carousel-wrapper row">
                  <div className="col-8">
                    <img src="/images/easportsfc24standardedition-eacanada-s1-2560x1440-b8f47ad67d72.avif" alt="" className="img-fluid" />
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-wrap gap-3">
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-03-1920x1080-6f38923efc79.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-04-1920x1080-888c9f17f2e1.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-05-1920x1080-332cc58b6aed.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-06-1920x1080-8799703619bf.avif" alt="" className="img-fluid" />
                      </button>
                    </div>
                    <div className="details d-flex flex-column justify-content-between mt-4">
                      <p className="text-start">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quo perspiciatis nisi optio esse qui in adipisci rem numquam debitis saepe eveniet molestias ipsa a cupiditate consequuntur iste maiores commodi!
                      </p>
                      <p className="text-start price">IDR 300,750</p>
                      <div className="btn-action d-flex gap-3">
                        <a href="/game/id" className="btn btn-success">
                          Beli Sekarang
                        </a>
                        <button className="btn btn-outline-light" onClick={handleAddToWishlist}>
                          Tambah ke Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="carousel-wrapper row">
                  <div className="col-8">
                    <img src="/images/easportsfc24standardedition-eacanada-s1-2560x1440-b8f47ad67d72.avif" alt="" className="img-fluid" />
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-wrap gap-3">
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-03-1920x1080-6f38923efc79.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-04-1920x1080-888c9f17f2e1.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-05-1920x1080-332cc58b6aed.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-06-1920x1080-8799703619bf.avif" alt="" className="img-fluid" />
                      </button>
                    </div>
                    <div className="details d-flex flex-column justify-content-between mt-4">
                      <p className="text-start">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quo perspiciatis nisi optio esse qui in adipisci rem numquam debitis saepe eveniet molestias ipsa a cupiditate consequuntur iste maiores commodi!
                      </p>
                      <p className="text-start price">IDR 300,750</p>
                      <div className="btn-action d-flex gap-3">
                        <a href="/game/id" className="btn btn-success">
                          Beli Sekarang
                        </a>
                        <button className="btn btn-outline-light" onClick={handleAddToWishlist}>
                          Tambah ke Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="carousel-wrapper row">
                  <div className="col-8">
                    <img src="/images/easportsfc24standardedition-eacanada-s1-2560x1440-b8f47ad67d72.avif" alt="" className="img-fluid" />
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-wrap gap-3">
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-03-1920x1080-6f38923efc79.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-04-1920x1080-888c9f17f2e1.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-05-1920x1080-332cc58b6aed.avif" alt="" className="img-fluid" />
                      </button>
                      <button className="border-0">
                        <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-06-1920x1080-8799703619bf.avif" alt="" className="img-fluid" />
                      </button>
                    </div>
                    <div className="details d-flex flex-column justify-content-between mt-4">
                      <p className="text-start">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quo perspiciatis nisi optio esse qui in adipisci rem numquam debitis saepe eveniet molestias ipsa a cupiditate consequuntur iste maiores commodi!
                      </p>
                      <p className="text-start price">IDR 300,750</p>
                      <div className="btn-action d-flex gap-3">
                        <a href="/game/id" className="btn btn-success">
                          Beli Sekarang
                        </a>
                        <button className="btn btn-outline-light" onClick={handleAddToWishlist}>
                          Tambah ke Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
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
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
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
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
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
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
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
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
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
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
              <GameCard />
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
