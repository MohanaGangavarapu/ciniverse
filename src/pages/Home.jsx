import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "./Pages.css";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
  const fetchMovies = async () => {
    let allMovies = [];

    for (let page = 1; page <= 5; page++) {
      const res = await fetch(
        "https://www.omdbapi.com/?s=avengers&page=${page}&apikey=7b0654a"
      );
      const data = await res.json();

      if (data.Search) {
        allMovies = [...allMovies, ...data.Search];
      }
    }

    setMovies(allMovies);
  };

  fetchMovies();
}, []);

  return (
    <div className="home">
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;