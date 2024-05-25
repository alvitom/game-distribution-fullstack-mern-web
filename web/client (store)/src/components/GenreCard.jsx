import React from "react";

const GenreCard = () => {
  return (
    <div className="col-3 my-3">
      <a href="" className="genre-card">
        <div className="genre-wrapper p-3 text-center">
          <div className="genre-image d-flex justify-content-center">
            <img src="https://cdn1.epicgames.com/spt-assets/17f6b2a9ee5e4b92a9bb913fdac68887/backrooms-break-1iiup.jpg?h=480&quality=medium&resize=1&w=360" alt="" className="img-fluid" />
            <img src="https://cdn1.epicgames.com/spt-assets/17f6b2a9ee5e4b92a9bb913fdac68887/backrooms-break-1iiup.jpg?h=480&quality=medium&resize=1&w=360" alt="" className="img-fluid" />
            <img src="https://cdn1.epicgames.com/spt-assets/17f6b2a9ee5e4b92a9bb913fdac68887/backrooms-break-1iiup.jpg?h=480&quality=medium&resize=1&w=360" alt="" className="img-fluid" />
          </div>
          <div className="genre-detail text-white mt-3">
            <h4 className="title mb-0">Action Games</h4>
          </div>
        </div>
      </a>
    </div>
  );
};

export default GenreCard;
