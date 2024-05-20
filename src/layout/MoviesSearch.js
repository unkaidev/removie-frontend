import ListMovie from "../components/movie/ListMovie";
import { useEffect, useState } from "react";
import { searchMoviesByTitle } from "../services/movieService";

const MoviesSearch = ({
  IsTyping,
  movieSearched,
  openModal,
  saveMovieInLocalStorage,
  storedIds
}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (movieSearched) {
      setLoading(true);
      searchMoviesByTitle(movieSearched)
        .then((searchMovies) => {
          setMovies(searchMovies);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error searching movies:", error);
          setLoading(false);
        });
    } else {
      setMovies([]);
    }
  }, [movieSearched]);

  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${IsTyping ? "max-h-[500px] mt-2 opacity-100" : "max-h-0 mt-0 opacity-0"
        }`}
    >
      <div className="m-2 flex gap-6  items-center  mb-4  ">
        <p className="ml-2 md:ml-12 xl:ml-12  text-2xl font-bold">
          Results: {movieSearched}
        </p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ListMovie
          loading={false}
          movies={movies}
          storedIds={storedIds}
          openModal={openModal}
          saveMovieInLocalStorage={saveMovieInLocalStorage}
        />
      )}
    </div>
  );
};
export default MoviesSearch;
