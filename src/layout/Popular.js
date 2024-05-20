import { useState } from "react";
import { useEffect } from "react";

import ListMovie from "../components/movie/ListMovie"
import { fetchMoviesPopular } from "../services/movieService";

const Popular = ({ openModal, saveMovieInLocalStorage, storedIds }) => {
  const [movies, setmovies] = useState([]);
  useEffect(() => {
    (async () => {
      const responseMovies = await fetchMoviesPopular();
      setmovies([]);
      setmovies(responseMovies);
    })();
  }, []);

  return (
    <div>
      <div className="m-2 flex gap-6  items-center  mb-4  ">
        <p className="ml-2 md:ml-12 xl:ml-12  text-2xl font-bold gradient-text ">
          Popular
        </p>
      </div>
      <ListMovie
        movies={movies}
        openModal={openModal}
        saveMovieInLocalStorage={saveMovieInLocalStorage}
        storedIds={storedIds}
      />
    </div>
  );
};
export default Popular;