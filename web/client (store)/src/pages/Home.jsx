import React from "react";
import Meta from "../components/Meta";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import GameCard from "../components/GameCard";

const Home = () => {
  return (
    <>
      <Meta title="Selamat Datang di Alvito Games Store" />
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
                    <div className="carousel">
                      <img src="/images/easportsfc24standardedition-eacanada-s1-2560x1440-b8f47ad67d72.avif" alt="" />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-wrap gap-2">
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-03-1920x1080-6f38923efc79.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-04-1920x1080-888c9f17f2e1.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-05-1920x1080-332cc58b6aed.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-06-1920x1080-8799703619bf.avif" alt="" className="img-fluid" />
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quo perspiciatis nisi optio esse qui in adipisci rem numquam debitis saepe eveniet molestias ipsa a cupiditate consequuntur iste maiores commodi!
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="carousel-wrapper row">
                  <div className="col-8">
                    <div className="carousel">
                      <img src="/images/easportsfc24standardedition-eacanada-s1-2560x1440-b8f47ad67d72.avif" alt="" />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-wrap gap-2">
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-03-1920x1080-6f38923efc79.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-04-1920x1080-888c9f17f2e1.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-05-1920x1080-332cc58b6aed.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-06-1920x1080-8799703619bf.avif" alt="" className="img-fluid" />
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quo perspiciatis nisi optio esse qui in adipisci rem numquam debitis saepe eveniet molestias ipsa a cupiditate consequuntur iste maiores commodi!
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="carousel-wrapper row">
                  <div className="col-8">
                    <div className="carousel">
                      <img src="/images/easportsfc24standardedition-eacanada-s1-2560x1440-b8f47ad67d72.avif" alt="" />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-wrap gap-2">
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-03-1920x1080-6f38923efc79.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-04-1920x1080-888c9f17f2e1.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-05-1920x1080-332cc58b6aed.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-06-1920x1080-8799703619bf.avif" alt="" className="img-fluid" />
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quo perspiciatis nisi optio esse qui in adipisci rem numquam debitis saepe eveniet molestias ipsa a cupiditate consequuntur iste maiores commodi!
                    </p>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="carousel-wrapper row">
                  <div className="col-8">
                    <div className="carousel">
                      <img src="/images/easportsfc24standardedition-eacanada-s1-2560x1440-b8f47ad67d72.avif" alt="" />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-wrap gap-2">
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-03-1920x1080-6f38923efc79.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-04-1920x1080-888c9f17f2e1.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-05-1920x1080-332cc58b6aed.avif" alt="" className="img-fluid" />
                      <img src="/images/egs-easportsfc24standardedition-eacanada-g1a-06-1920x1080-8799703619bf.avif" alt="" className="img-fluid" />
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, quo perspiciatis nisi optio esse qui in adipisci rem numquam debitis saepe eveniet molestias ipsa a cupiditate consequuntur iste maiores commodi!
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </section>
          <section className="discount-section py-4">
            <div className="row">
              <div className="col-12 mb-3">
                <h3 className="section-heading">Sedang Diskon</h3>
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
          <section className="top-seller-section py-4">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                <h3>Penjualan Teratas</h3>
                <a href="" className="btn btn-outline-light">
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
                <a href="" className="btn btn-outline-light">
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
                <a href="" className="btn btn-outline-light">
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
                <a href="" className="btn btn-outline-light">
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
                <a href="" className="btn btn-outline-light">
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
