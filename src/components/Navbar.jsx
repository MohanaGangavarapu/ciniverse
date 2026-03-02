import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import MovieCard from "./MovieCard";
import "./Navbar.css";

function Navbar() {
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const API_KEY = "7b0654a";

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Response === "True") {
            setMovies(data.Search);
          } else {
            setMovies([]);
          }
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo">CINIVERSE</div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/tvshows">TV Shows</Link>
          </div>
        </div>

        <div className="nav-right">
          <FaSearch
            className="search-icon"
            onClick={() => setOpenSearch(!openSearch)}
          />
        </div>
      </nav>

      {openSearch && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies or series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />

          <div className="search-results">
            {movies.length > 0
              ? movies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))
              : query && <p className="not-found">No results found</p>}
          </div>
        </div>
      )}
    </>
  );
}
export default Navbar;
