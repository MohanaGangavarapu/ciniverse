import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "./Pages.css";

function TVShows() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const keywords = ["netflix", "star", "crime", "drama"];
      let allShows = [];

      for (let word of keywords) {
        for (let page = 1; page <= 2; page++) {
          const res = await fetch(
            `https://www.omdbapi.com/?s=${word}&type=series&page=${page}&apikey=7b0654a`
          );

          const data = await res.json();

          if (data.Search) {
            allShows = [...allShows, ...data.Search];
          }
        }
      }

      const uniqueShows = [
        ...new Map(allShows.map(s => [s.imdbID, s])).values()
      ];

      setShows(uniqueShows);
    };

    fetchShows();
  }, []);

  return (
    <div className="page">
      <h2>TV Shows</h2>

      <div className="movie-grid">
        {shows.map(show => (
          <MovieCard key={show.imdbID} movie={show} />
        ))}
      </div>
    </div>
  );
}

export default TVShows;