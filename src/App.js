import React, { createRef, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SearchMovieAndTitle from "./layout/SearchMovieAndTitle";
import useMovie from "./hooks/movie";
import NavBar from "./layout/NavBar";
import Movies from "./pages/Movies";
import WatchList from '../src/pages/WatchList'
import Reviews from "./components/reviews/Reviews";
import WishList from '../src/pages/WishList'
import { fetchAMovie } from "./services/movieService";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import Login from "./components/login/Login";
import Scrollbars from "react-custom-scrollbars-2";
import Register from "./components/register/Register";
import { fetchMoviesInWishList, removeMovieToWishList } from "./services/wishlistService";


const App = (props) => {
  const storedItemsString = localStorage.getItem("moviesIds");
  const storedItems = storedItemsString ? JSON.parse(storedItemsString) : [];
  const [StoredItems, setStoredItems] = useState(storedItems);

  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);


  const {
    debounceGetMovies,
    imageIndex,
    setIsTyping,
    isTyping,
    isOpen,
    setIsOpen,
    movieSearch
  } = useMovie();


  useEffect(() => {
    document.body.classList.add("scroll-visible");
  }, []);
  useEffect(() => {
    localStorage.setItem("moviesIds", JSON.stringify(StoredItems));
  }, [StoredItems]);

  const deleteMovieInLocalStorage = (movie) => {
    const moviesFilter = StoredItems.filter(
      (movieStored) => movieStored.imdbId !== movie.imdbId
    );
    setStoredItems(moviesFilter);
  };

  const getMovieData = async (movieId) => {

    try {
      const response = await fetchAMovie(movieId);

      const singleMovie = response;

      setMovie(singleMovie);

      setReviews(singleMovie.reviewIds);

    }
    catch (error) {
      console.error(error);
    }

  }
  useEffect(() => {
    getMovieData()
  }, [])


  const account = useSelector(state => state.user.dataRedux.account);
  const isAuthenticated = useSelector(state => state.user.dataRedux.isAuthenticated);

  const [moviesInWishList, setMoviesInWishList] = useState([]);

  useEffect(() => {
    fetchMoviesWishList()
  }, [])

  const fetchMoviesWishList = async () => {
    await fetchMoviesInWishList(account.username)
      .then(response => {
        setMoviesInWishList(response.dt);
      })
      .catch(error => {
        console.error("Error fetching movies in wishlist: ", error);
      });
  };

  const handleRemoveMovie = async (movie) => {
    await removeMovieToWishList(account.username, movie.imdbId)
      .then(response => {
        fetchMoviesWishList();
        window.location.reload()
      })
      .catch(error => {
        console.error("Error removing movie from wishlist: ", error);
      });
  };



  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
  }, [account])

  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>

      <main>
        <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <SearchMovieAndTitle
          imageIndex={imageIndex}
          typing={setIsTyping}
          searchMovie={debounceGetMovies}
        />

      </main>
      <>
        <Routes>
          <Route
            path="/login"
            element={
              <Login />
            }
          />
          <Route path="/register"
            element={
              <Register />
            }>
          </Route>
          <Route
            path="/"
            element={
              <Movies
                moviesInWishList={moviesInWishList}
                movieSearch={movieSearch}
                IsTyping={isTyping}
                StoredItems={StoredItems}
                setStoredItems={setStoredItems}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <WatchList
                moviesStorage={StoredItems}
                deleteMovieInLocalStorage={deleteMovieInLocalStorage}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <WishList
                fetchMoviesWishList={fetchMoviesWishList}
                moviesInWishList={moviesInWishList}
                handleRemoveMovie={handleRemoveMovie}
              />
            }
          />

          {
            account && isAuthenticated === true &&
            <Route path="/Reviews/:movieId"
              element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
          }

        </Routes>
      </>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Scrollbars>

  );

};

export default App