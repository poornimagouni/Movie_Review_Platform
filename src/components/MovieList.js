import React from "react";

const MovieList = ({ movies, selectMovie }) => {
  return (
    <div className="home-container">
      <h2 className="section-title">Trending Movies</h2>

      <div className="movie-row">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => selectMovie(movie)}
          >
            <img src={movie.thumbnail} alt={movie.name} />
            <p>{movie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
