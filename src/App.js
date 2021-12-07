import React, { useEffect, useState, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-http-ab6b1-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();

      const loadedMovies = Object.keys(data).map((key) => {
        return {
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        };
      });

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-http-ab6b1-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Context-Type": "application/json" },
      }
    );

    await response.json();

    fetchMoviesHandler();
  }

  let style = { color: "#27a57f" };

  let content = (
    <p style={style}>
      Click the button to view some movies{" "}
      <span role="img" aria-label="Panda">
        🚀
      </span>
    </p>
  );

  if (movies.length > 0) content = <MoviesList movies={movies} />;

  if (error) content = <p style={style}>{error}</p>;

  if (isLoading) content = <p style={style}>Loading...</p>;

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      {movies.length === 0 && (
        <section>
          <button onClick={fetchMoviesHandler}>Fetch Movies</button>
        </section>
      )}
      <section>{content}</section>
    </>
  );
}

export default App;
