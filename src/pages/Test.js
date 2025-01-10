import React, { useEffect, useState } from "react";
import NavLogo from "./movie.png";
import "./pages.css";
import "./queriesPage.css";
import { Link } from "react-router-dom";

const Test = ({ select, addToWatchlist }) => {
  const [displayMovie, setDisplayMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apikey = "48bd2643";
  useEffect(() => {
    setIsLoading(true);

    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=${apikey}&i=${select}`
        );
        const data = await res.json();
        setDisplayMovie(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch movie data");
        setIsLoading(false);
      }
    }
    fetchMovie();
  }, [select]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Failed />;
  }
  const Crazy = displayMovie?.imdbRating;
  const worst = displayMovie?.imdbRating;
  function rev() {
    if (worst >= 6 && worst < 8) {
      return 1;
    }
  }
  function Loader() {
    return <p className="load">Loading...</p>;
  }
  function Failed() {
    return <p className="load">Failed To Load Data 😭</p>;
  }

  return (
    <>
      <nav>
        <Link to="/">
          <img src={NavLogo} className="nav-image" alt="popcorn" />
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className="nav-h">Night Flicks</h1>
        </Link>
      </nav>
      <div className="pt">
        <div className="left">
          <img src={displayMovie.Poster} alt="moviePoster" />
        </div>
        <div className="right">
          <h1 className="right-h">{displayMovie.Title}</h1>
          <p className="right-p">{displayMovie.Plot}</p>
          <p className="plot">
            <span>Genere:</span> {displayMovie.Genre}
          </p>
          <p className="lang">
            <span>Language:</span> {displayMovie.Language}
          </p>
          <p className="lang">
            <span>Duration:</span> {displayMovie.Runtime}
          </p>
          <p className="lang">
            <span>Actors:</span> {displayMovie.Actors}
          </p>
          <p className="lang">
            <span>Director:</span> {displayMovie.Director}
          </p>
          <p className="lang">
            <span>imdb Rating:</span> {displayMovie.imdbRating}⭐
          </p>
        </div>
      </div>
      {Crazy >= 8 && (
        <div className="sub-pt">
          <h1>NightFlicks Take On {displayMovie.Title}</h1>
          <Review displaymovie={displayMovie} />
          <div className="st">
            <p className="st-h">NightFlicks Tells It Straight:</p>
            <p className="st-p">
              Unforgettable Masterpiece A NightFlicks Must-Watch!
            </p>
          </div>
          <button
            onClick={() => addToWatchlist(displayMovie)}
            className="wishb"
          >
            Add to Watchlist
          </button>

          <Link to="/wishlist">
            <button className="wishb2">Go to Wishlist</button>
          </Link>
        </div>
      )}
      {rev() === 1 && (
        <div className="sub-pt">
          <h1>NightFlicks Take On {displayMovie.Title}</h1>
          <ReviewAvg displaymovie={displayMovie} />
          <div className="st">
            <p className="st-h">NightFlicks Tells It Straight:</p>
            <p className="st-p">
              Casual Entertainment For When You’ve Got Time to Spare on
              NightFlicks
            </p>
          </div>
          <button
            onClick={() => addToWatchlist(displayMovie)}
            className="wishb"
          >
            Add to Watchlist
          </button>

          <Link to="/wishlist">
            <button className="wishb2">Go to Wishlist</button>
          </Link>
        </div>
      )}
      {worst < 6 && (
        <div className="sub-pt">
          <h1>NightFlicks Take On {displayMovie.Title}</h1>
          <ReviewPoor displaymovie={displayMovie} />
          <div className="st">
            <p className="st-h">NightFlicks Tells It Straight:</p>
            <p className="st-p">
              Disappointing Experience Skip This One on NightFlicks
            </p>
          </div>
          <button
            onClick={() => addToWatchlist(displayMovie)}
            className="wishb"
          >
            Add to Watchlist
          </button>

          <Link to="/wishlist">
            <button className="wishb2">Go to Wishlist</button>
          </Link>
        </div>
      )}
    </>
  );
};
function Review() {
  return (
    <>
      <div className="rev">
        This movie captivates with its perfect blend of story, emotion, and
        artistry. Stunning visuals, memorable characters, and a
        thought-provoking narrative come together to create an unforgettable
        experience. The film lingers in your mind, sparking reflection long
        after it ends.This is one movie you absolutely need to experience—more
        than entertainment, it's a must-watch journey.
      </div>
    </>
  );
}
function ReviewAvg() {
  return (
    <>
      <div className="rev">
        This movie offers a decent storyline with a few enjoyable moments,
        though it lacks the depth or excitement to stand out. The performances
        are solid but not groundbreaking, and while the visuals are fine, they
        don’t particularly wow. It’s the kind of film that won’t leave a lasting
        impression but provides light entertainment for a casual watch. If
        you’re looking for something to fill some free time, this movie is a
        good choice—it’s not extraordinary, but it’s a pleasant way to unwind.
      </div>
    </>
  );
}
function ReviewPoor() {
  return (
    <>
      <div className="rev">
        This movie falls short in almost every aspect, from its weak plot to the
        uninspired performances. The pacing drags, and even the visuals fail to
        elevate the overall experience. The dialogue feels forced, and there’s
        little emotional connection to the characters or story. Unfortunately,
        it’s one of those films that feels more like a chore to sit through than
        an enjoyable watch. "Unless you’re really curious, it’s best to skip
        this one—there are far better ways to spend your time."
      </div>
    </>
  );
}
export default Test;
