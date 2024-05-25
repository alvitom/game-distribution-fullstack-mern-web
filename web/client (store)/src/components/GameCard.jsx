import React from "react";

const GameCard = ({ discount, collection, page }) => {
  return (
    <div className={collection || page === "browse" ? "col-3 my-4" : "col-2"}>
      <a href="/game/id" className="game-card position-relative">
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
              <img
                src="https://cdn1.epicgames.com/0584d2013f0149a791e7b9bad0eec102/offer/GTAV_EGS_Artwork_1200x1600_Portrait%20Store%20Banner-1200x1600-382243057711adf80322ed2aeea42191.jpg?h=480&quality=medium&resize=1&w=360"
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="game-detail p-2 text-white">
              <p className="title mb-1">Grand Theft Auto V: Premium Edition</p>
              <p className="price mb-0">IDR 300,750</p>
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
