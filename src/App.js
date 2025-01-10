import "./App.css";
import "./queriesApp.css";
import { useEffect, useRef, useState } from "react";
import HeroLogo from "./transImage.png";
import NavLogo from "./movie.png";
import Roll from "./roll.png";
import ActionDetails from "./ActionData.js";
import RomanticDetails from "./Romantic.js";
import HorrorDetails from "./Horror.js";
import ComedyDetails from "./Comedy.js";
import instagram from "./instagram.png";
import menu from "./menu_24dp_BLACK_FILL0_wght400_GRAD0_opsz24.png";
import Test from "./pages/Test";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import WishList from "./pages/WishList.js";
const key = "48bd2643";

//http://www.omdbapi.com/?i=tt3896198&apikey=48bd2643&i=${id}
//`http://www.omdbapi.com/?apikey=48bd2643&s=${search}`

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [select, setSelect] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const apikey = "48bd2643";
  //const [test, settest] = useState(second)

  // Function to add a movie to the watchlist
  const addToWatchlist = (movie) => {
    setWatchlist((prevList) => {
      alert("Movie Added Successfully");
      const exists = prevList.some((m) => m.imdbID === movie.imdbID);
      if (!exists) {
        return [...prevList, movie];
      } else {
        return prevList;
      }
    });
  };
  useEffect(
    function () {
      async function Test() {
        const res = await fetch(
          `https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?i=tt3896198&apikey=${apikey}&s=${search}`
        );
        const data = await res.json();

        setMovies(data.Search || []);
      }
      Test();
    },
    [search]
  );
  const cardsRef = useRef(null);

  useEffect(() => {
    const cardsElement = cardsRef.current;

    if (cardsElement) {
      cardsElement.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (cardsElement) {
        cardsElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="test"
            element={<Test select={select} addToWatchlist={addToWatchlist} />}
          />
          <Route
            path="wishlist"
            element={<WishList select={select} watchlist={watchlist} />}
          />

          <Route
            path="/"
            element={
              <MainContent
                search={search}
                setSearch={setSearch}
                movies={movies}
                select={select}
                setSelect={setSelect}
                cardsRef={cardsRef}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
function MainContent({
  search,
  setSearch,
  movies,
  select,
  setSelect,
  cardsRef,
}) {
  return (
    <>
      <section className="page1">
        <nav>
          <img src={NavLogo} className="nav-image" alt="popcorn" />
          <h1 className="nav-h">Night Flicks</h1>

          <input
            className="nav-search"
            type="text"
            placeholder="Search Movies"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <div className="t">
            <img src={menu} alt="menu" width={30} className="menu" />
            <Link to="/wishlist" className="watch">
              <p>My Watchlist</p>
            </Link>
            <a href="#explore" className="aa">
              Explore Movies
            </a>
          </div>
        </nav>
        <SearchList movies={movies} select={select} setSelect={setSelect} />
        <div className="hero">
          <div className="left">
            <h2 className="hero-h">
              Find your next favorite film and plan a night to remember
            </h2>
            <p className="hero-p">
              NightFlicks is your ultimate movie night planner. Whether you're
              hanging out with friends, family, or enjoying a solo binge, we've
              got you covered.
            </p>
          </div>
          <img className="hero-img" src={HeroLogo} alt="heroimage" />
        </div>
      </section>
      <section className="page2">
        <div className="mini">
          <img className="p2-i" src={Roll} alt="rolls" />
          <p>Lights</p>
          <p>Camera</p>
          <p>Action!</p>
          <img className="p2-i" src={Roll} alt="rolls" />
        </div>
      </section>
      <section className="page3" id="explore">
        <h1 className="p3-h">Explosive adventures for action lovers</h1>;
        <div className="movie-row" ref={cardsRef}>
          {ActionDetails.map((x) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link to="test">
                  <img
                    src={x.Poster}
                    alt="movieimage"
                    className="p3-img"
                    onClick={() => {
                      setSelect(x.imbdId);
                    }}
                  />
                </Link>
                <p className="p3-p">{x.Title}</p>
              </div>
            );
          })}
        </div>
        <h1 className="p3-h">Love Stories to Melt Your Heart ❤</h1>
        <div className="movie-row" ref={cardsRef}>
          {RomanticDetails.map((x) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link to="test">
                  <img
                    src={x.Poster}
                    alt="movieimage"
                    className="p3-img"
                    onClick={() => {
                      setSelect(x.imdbId);
                    }}
                  />{" "}
                </Link>
                <p className="p3-p">{x.Title}</p>
              </div>
            );
          })}
        </div>
        <h1 className="p3-h">Chills, Thrills, and Screams 🎃</h1>
        <div className="movie-row" ref={cardsRef}>
          {HorrorDetails.map((x) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link to="test">
                  <img
                    src={x.Poster}
                    alt="movieimage"
                    className="p3-img"
                    onClick={() => setSelect(x.imdbId)}
                  />
                </Link>
                <p className="p3-p">{x.Title}</p>
              </div>
            );
          })}
        </div>
        <h1 className="p3-h">Good Times, Great Laughs 🎉</h1>
        <div className="movie-row" ref={cardsRef}>
          {ComedyDetails.map((x) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link to="test">
                  <img
                    src={x.Poster}
                    alt="movieimage"
                    className="p3-img"
                    onClick={() => setSelect(x.imdbId)}
                  />
                </Link>
                <p className="p3-p">{x.Title}</p>
              </div>
            );
          })}
        </div>
      </section>
      <footer className="footer">
        <div className="ft-c">
          <div>
            <p> For More Film Updates</p>
            <input type="text" placeholder="Email" />

            <button>Submit</button>
          </div>
          <div className="name">
            Prahaladh
            <a href="https://www.instagram.com/prahaladh_05/" target="_blank">
              <img src={instagram} height={30} alt="insta" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
function SearchList({ movies, setSelect }) {
  return (
    <div className="search-res">
      {movies.map((x, i) => (
        <div
          className="search-drop"
          key={i}
          onClick={() => setSelect(x.imdbID)}
        >
          <div>
            <Link to="test">
              <img src={x.Poster} alt="moviePosters" height={80} />
            </Link>
          </div>
          <p>
            {x.Title} {x.Year}
          </p>
        </div>
      ))}
    </div>
  );
}
// https://prahaladh04.github.io/night-flicks/
export default App;
