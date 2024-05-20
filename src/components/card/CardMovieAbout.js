import { NO_IMAGE } from "../../utils/constants/const";
import ProgressBar from "../progressBar/ProgressBar";
import { RatingComponent, RatingStar } from '../movie/RatingComponent';
import { rateMovie, searchMoviesRating } from "../../services/movieService";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CardMovieAbout.css";
import { useSelector } from "react-redux";
import { addMovieToWishList } from "../../services/wishlistService";
import { toast } from "react-toastify";

const CardMovieAbout = ({ movie, crews, moviesInWishList }) => {
  const account = useSelector(state => state.user.dataRedux.account);
  const isAuthenticated = useSelector(state => state.user.dataRedux.isAuthenticated);

  const [isInWishList, setIsInWishList] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [ratingKey, setRatingKey] = useState(0);
  const navigate = useNavigate();

  function checkMovieInWishlist(movie, moviesInWishList) {
    if (Array.isArray(moviesInWishList)) {
      for (let i = 0; i < moviesInWishList.length; i++) {
        if (movie.imdbId === moviesInWishList[i].imdbId) {
          return true;
        }
      }
    }
    return false;
  }

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  useEffect(() => {
    if (movie && Array.isArray(moviesInWishList)) {
      setUserScore(movie.vote_average);
      setIsInWishList(checkMovieInWishlist(movie, moviesInWishList));
    }
  }, [movie, moviesInWishList]);


  const handleRatingClick = () => {
    setIsRatingModalOpen(!isRatingModalOpen);
  };

  const handleUpdateRating = (imdbId, newValue) => {
    rateMovie(imdbId, newValue)
      .then(() => {
        searchMoviesRating(imdbId)
          .then(updatedRating => {
            setUserScore(updatedRating);
            setIsRatingModalOpen(false);
            setRatingKey(prevKey => prevKey + 1);

          })
          .catch(error => {
            console.error("Error getting updated rating:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating rating:", error);
      });
  };

  const handleAddMovie = (imdbId) => {
    addMovieToWishList(account.username, imdbId)
      .then(response => {
        toast.success(response.em);
        setIsInWishList(true);
      })
      .catch(error => {
        console.error("Error add movie from wishlist: ", error);
      });
  };

  return (
    <section className="w-full h-full flex p-2 gap-5">
      <div className="w-[30%] animate-fadeIn">
        <img
          className="object-cover w-full h-full rounded-md"
          src={movie ? movie.poster : NO_IMAGE}
          alt={`Title: ${movie?.title}`}
        />
      </div>

      <div className="w-[70%]">
        <div className="flex gap-2">
          <ProgressBar percent={userScore} />
          <div>
            <p className="text-white font-bold">User Score</p>
          </div>
        </div>
        <ul
          className="mt-5"
        >
          {crews && crews.map((crew, index) => (
            <li key={index}>
              <span className="text-white font-bold"> - {crew.name}</span>
              <span className="text-white font-bold"> - ({crew.known_for_department})</span>
            </li>
          ))}
        </ul>

        <div className="w-full flex flex-col items-center justify-between mt-10">
          <p className="text-white font-bold">"{movie?.tagline}"</p>
        </div>
        <div
          className=" w-full flex flex-col items-center mt-10 justify-center"        >
          <div className="flex p-2 gap-5">
            <div>
              <RatingStar key={ratingKey} imdbId={movie?.imdbId} onClick={handleRatingClick} />
            </div>

            {isAuthenticated && account && isRatingModalOpen && (
              <RatingComponent
                imdbId={movie?.imdbId}
                onUpdateRating={handleUpdateRating}
                onClose={() => setIsRatingModalOpen(false)}
              />
            )}

            {isAuthenticated && account ?
              (
                <div className="flex p-2 gap-5">
                  <button className="flex text-white items-center" onClick={() => reviews(movie.imdbId)}>
                    <img src="/review.png" title="Review" className="review-img" />
                  </button>
                </div>
              )
              :
              (
                <div className="flex p-2 gap-5">
                  <button className="flex text-white items-center">
                    <img src="/review.png" title="Login to Review" className="review-img" />
                  </button>
                </div>
              )

            }

            {isAuthenticated && account ?
              (
                <div className="flex p-2 gap-5"
                  onClick={() => handleAddMovie(movie?.imdbId)}
                >
                  <button className="flex text-white items-center">
                    <img src={isInWishList ? "/heart.png" : "/break_heart.png"} title="Favorite" className="review-img" />
                  </button>
                </div>
              )
              :
              (
                <div className="flex p-2 gap-5">
                  <button className="flex text-white items-center">
                    <img src="/heart.png" title="Login to Favorite" className="review-img" />
                  </button>
                </div>
              )
            }
          </div>

        </div>





      </div>
    </section>
  );
};

export default CardMovieAbout;
