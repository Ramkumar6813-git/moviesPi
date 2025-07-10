import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/search";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { updateSearchCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_CONSTANTS = {
  INITIAL: "initial",
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [apiStatus, setApiStatus] = useState(API_CONSTANTS.INITIAL);
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

  // Debounce the search term with a 500ms delay
  useDebounce(() => setDebounceSearchTerm(searchTerm), 300, [searchTerm]);

  const fetchAndGetMovies = async (query = "") => {
    setApiStatus(API_CONSTANTS.LOADING);
    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endPoint, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovies(data.results || []);
      setApiStatus(API_CONSTANTS.SUCCESS);
      updateSearchCount();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching data. Please try again later.");
      setApiStatus(API_CONSTANTS.FAILURE);
    }
  };

  // Use debounced search term for API calls
  useEffect(() => {
    fetchAndGetMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  const Loader = () => {
    return <h3>Loading...</h3>;
  };

  const Movies = () => {
    return (
      <div>
        {movies.length === 0 ? (
          <h2 className="mt-20">No Movie Found.</h2>
        ) : (
          <ul>
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </ul>
        )}
      </div>
    );
  };

  const Failure = () => {
    return <p className="text-red-500">{errorMessage}</p>;
  };

  const renderContent = () => {
    switch (apiStatus) {
      case API_CONSTANTS.LOADING:
        return <Loader />;
      case API_CONSTANTS.SUCCESS:
        return <Movies />;
      case API_CONSTANTS.FAILURE:
        return <Failure />;
      default:
        return null;
    }
  };

  return (
    <main style={{ backgroundImage: "url('/BG.png')" }}>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="hero-banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You Like
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="pt-5 text-3xl">All Movies</h2>
          {renderContent()}
        </section>
      </div>
    </main>
  );
};

export default App;
