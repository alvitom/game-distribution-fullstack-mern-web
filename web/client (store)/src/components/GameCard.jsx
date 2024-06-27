import React from "react";

const GameCard = ({ discount, collection, page, data }) => {
  return (
    <div className={collection || page === "game" ? "col-3 my-4" : "col-2"}>
      <a href={`/game/${data?.slug}`} className="game-card position-relative">
        {discount ? (
          <>
            <div className="game-image">
              <img src="https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_TheLegendofHeroesTrailstoAzure_NihonFalcom_S2_1200x1600-9f7d6b01de4e9f8527d8def616af108d?h=480&quality=medium&resize=1&w=360" alt="" className="img-fluid" />
            </div>
            <div className="game-detail p-2 text-white">
              <span className="title">The Legend of Heroes: Trails to Azure</span>
              <div className="d-flex justify-content-between align-items-center">
                <div className="dicount-percentage">
                  <span>50%</span>
                </div>
                <div className="d-flex flex-column price">
                  <div className="old-price">
                    <span className="text-decoration-line-through">445,999</span>
                  </div>
                  <div className="new-price">
                    <span>356,799</span>
                  </div>
                </div>
              </div>
              <div className="action-btn position-absolute">
                <button className="border-white text-white btn btn-dark">+</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="game-image">
              <img src={data?.coverImage.url} alt={data?.title} className="img-fluid" />
            </div>
            <div className="game-detail p-2 text-white">
              <p className="title mb-1">{data?.title}</p>
              <p className="price mb-0">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(data?.price)}
              </p>
            </div>
            <div className="action-btn position-absolute">
              <button className="border-white text-white btn btn-dark">+</button>
            </div>
          </>
        )}
      </a>
    </div>
  );
};

export default GameCard;
