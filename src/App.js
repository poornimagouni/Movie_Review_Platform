import React, { useState } from "react";
import Login from "./components/Login";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import { moviesData } from "./data";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState(moviesData);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const updateMovie = (updatedMovie) => {
    setMovies(
      movies.map((m) =>
        m.id === updatedMovie.id ? updatedMovie : m
      )
    );
    setSelectedMovie(updatedMovie);
  };

  if (!user) return <Login setUser={setUser} />;

  if (selectedMovie)
    return (
      <MovieDetails
        movie={selectedMovie}
        user={user}
        updateMovie={updateMovie}
        goBack={() => setSelectedMovie(null)}
      />
    );

  return (
    <MovieList
      movies={movies}
      selectMovie={setSelectedMovie}
    />
  );
}

export default App;
