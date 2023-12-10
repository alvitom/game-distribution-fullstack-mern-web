import React from "react";
import { Link } from "react-router-dom";

const FeaturedGames = () => {
  return (
    <section className="featured-games mb-4">
      <h2>Featured Games</h2>
      <div className="row">
        {/* Featured games cards using Bootstrap grid system */}
        <div className="col-md-4 mb-3">
          <div className="card">
            <img src="game-image-1.jpg" alt="Game 1" className="card-img-top" />
            <div className="card-body">
              <h3 className="card-title">Game Title 1</h3>
              <p className="card-text">Description of the game.</p>
              <Link to="/game/1" className="btn btn-primary">
                Play Now
              </Link>
            </div>
          </div>
        </div>
        {/* Add more game cards as needed */}
      </div>
    </section>
  );
};

export default FeaturedGames;
