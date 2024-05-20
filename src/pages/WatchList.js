import React, { useState } from "react";
import CardMovie from '../components/card/CardMovie';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ModalMovie from '../components/movie/ModalMovie';
import "../App.css";
import useMovie from "../hooks/movie";


const WatchList = ({ moviesStorage, deleteMovieInLocalStorage }) => {

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
          Watch List
        </h1>
        <TransitionGroup>
          {moviesStorage.length === 0 ? (
            <p className="text-white text-center">(~Empty list~)</p>
          ) : (
            moviesStorage.map((movie, index) => (
              <CSSTransition
                key={movie.imdbId + index}
                timeout={1000}
                classNames="fade"
              >
                <div className="flex gap-6 bg-black/30 mt-2">
                  <CardMovie
                    deleteMovieInLocalStorage={deleteMovieInLocalStorage}
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
          )}
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

export default WatchList;
