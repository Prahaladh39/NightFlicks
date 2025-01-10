import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavLogo from "./movie.png";
const WishList = ({ watchlist }) => {
  return (
    <>
      <div>
        <nav>
          <Link to="/">
            <img src={NavLogo} className="nav-image" alt="popcorn" />
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className="nav-h">Night Flicks</h1>
          </Link>
        </nav>
        <h1 className="wish-h">Your Watchlist</h1>
        <div className="fle">
          {watchlist.length > 0 ? (
            watchlist.map((movie) => (
              <div>
                <img src={movie.Poster} alt="pos" />
                <p>{movie.Title}</p>
              </div>
            ))
          ) : (
            <p>No movies in your watchlist.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default WishList;
