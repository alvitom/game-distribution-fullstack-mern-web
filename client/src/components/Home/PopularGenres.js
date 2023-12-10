import React from "react";
import { Link } from "react-router-dom";

const PopularGenres = () => {
  return (
    <section className="popular-genres">
      <h2>Popular Genres</h2>
      <ul className="list-inline">
        {/* List of popular game genres using Bootstrap list-group */}
        <li className="list-inline-item">
          <Link to="#" className="list-group-item list-group-item-action">
            Action
          </Link>
        </li>
        <li className="list-inline-item">
          <Link to="#" className="list-group-item list-group-item-action">
            Adventure
          </Link>
        </li>
        <li className="list-inline-item">
          <Link to="#" className="list-group-item list-group-item-action">
            RPG
          </Link>
        </li>
        {/* Add more genres */}
      </ul>
    </section>
  );
};

export default PopularGenres;
