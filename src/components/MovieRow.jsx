import MovieCard from "./MovieCard";
import "./MovieRow.css";

function MovieRow({ title, movies }) {
  return (
    <div className="row">
      <div className="row-header">
        <h2>{title}</h2>
        <span className="see-more">See more &gt;</span>
      </div>

      <div className="row-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
