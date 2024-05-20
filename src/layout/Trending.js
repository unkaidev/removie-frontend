import { useEffect, useState } from "react";
// Mocks
// import moviesType from "../mocks/movies_now_playing.json";
import Switch from "../components/switch/Switch"
import ListMovie from "../components/movie/ListMovie";
import { fetchMoviesTrending } from "../services/movieService";

const Trending = ({
  typeTitle,
  openModal,
  saveMovieInLocalStorage,
  storedIds,
}) => {
  const [today, setToday] = useState(true);
  const [week, setWeek] = useState(false);
  const [movies, setmovies] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(true);
    fetchMoviesTrending(`${today ? 'day' : 'week'}`)
      .then((data) => setmovies(data))
      .finally(() => {
        setloading(false);
      });
  }, [week, today]);
  return (
    <>
      <div
        style={{
          backgroundImage: `url("https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg")`,
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
        className="w-full  my-5 flex flex-col justify-center items-center   "
      >
        <div className="w-full  relative ">
          <div className="m-2 flex gap-6  items-center  mb-4  ">
            <p className=" md:ml-12 xl:ml-12  text-2xl font-bold gradient-text">
              {typeTitle}
            </p>
            <Switch
              setToday={setToday}
              setWeek={setWeek}
              today={today}
              week={week}
            />
          </div>

          <ListMovie
            saveMovieInLocalStorage={saveMovieInLocalStorage}
            loading={loading}
            movies={movies}
            openModal={openModal}
            storedIds={storedIds}
          />
        </div>
      </div>
    </>
  );
};
export default Trending