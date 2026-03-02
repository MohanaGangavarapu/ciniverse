import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "./Pages.css";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const keywords = ["marvel", "batman", "avengers", "action"];
      let allMovies = [];

      for (let word of keywords) {
        for (let page = 1; page <= 2; page++) {
          const res = await fetch(
            `https://www.omdbapi.com/?s=${word}&type=movie&page=${page}&apikey=7b0654a`
          );

          const data = await res.json();

          if (data.Search) {
            allMovies = [...allMovies, ...data.Search];
          }
        }
      }

      // remove duplicates
      const uniqueMovies = [
        ...new Map(allMovies.map(m => [m.imdbID, m])).values()
      ];

      setMovies(uniqueMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="page">
      <h2>Movies</h2>

      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Movies;