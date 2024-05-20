import React, { useEffect, useState } from "react";
import CardMovie from '../components/card/CardMovie';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ModalMovie from '../components/movie/ModalMovie';
import "../App.css";
import useMovie from "../hooks/movie";

const WishList = ({ moviesInWishList, handleRemoveMovie, fetchMoviesWishList }) => {

  useEffect(() => {
    fetchMoviesWishList()
  }, [])

  const {
    closeModal,
    isModalOpen,
    openModal,
    selectedMovie,
  } = useMovie();

  return (
    <main className="m-4">
      <div>
        <h1 className="text-white text-2xl font-bold text-center gradient-text">
          Wish List
        </h1>
        <TransitionGroup>
          {moviesInWishList && Array.isArray(moviesInWishList) && moviesInWishList.length > 0 &&
            (
              moviesInWishList.map((movie, index) => (
                <CSSTransition
                  key={movie.imdbId + index}
                  timeout={1000}
                  classNames="fade"
                >
                  <div className="flex gap-6 bg-black/30 mt-2">
                    <CardMovie
                      deleteMovieInLocalStorage={handleRemoveMovie}
                      movie={movie}
                      fav={true}
                      openModal={() => {
                        openModal(movie);
                      }}
                    />
                    <div className="">
                      <p className="text-white font-bold text-sm line-clamp-[10]">
                        {movie.overview}
                      </p>
                    </div>
                  </div>
                </CSSTransition>
              ))
            )
          }
        </TransitionGroup>
      </div>
      {selectedMovie && (
        <ModalMovie
          closeModal={closeModal}
          isModalOpen={true}
          selectedMovie={selectedMovie}
        />
      )}
    </main>
  );
};

export default WishList;
