import { useState } from "react";
import useRandomImage from "./useRandomImg";
import Modal from "react-modal";
import debounce from "just-debounce-it";
import { fetchAMovie, fetchAMovieCredit } from "../services/movieService";

const useMovie = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { imageIndex } = useRandomImage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [movieSearch, setMovieSearch] = useState("");

  Modal.setAppElement("#root");

  const openModal = async (movie) => {
    try {
      const swiperContainer = document.querySelector(".swiper-container");
      if (swiperContainer) {
        swiperContainer.classList.add("index-swiper");
      }
      setIsModalOpen(true);
      const [movieData, credits] = await Promise.all([
        fetchAMovie(movie.imdbId),
        fetchAMovieCredit(movie.imdbId)
      ]);
      setSelectedMovie({ movie: movieData, credits });
    } catch (error) {
      console.error("Error opening modal:", error);
    }
  };

  const debounceGetMovies = debounce((movieSearch) => {
    setMovieSearch(movieSearch);
  }, 500);

  const closeModal = () => {
    try {
      const swiperContainer = document.querySelector(".swiper-container");
      if (swiperContainer) {
        swiperContainer.classList.remove("index-swiper");
      }
      setSelectedMovie(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  };

  return {
    imageIndex,
    isModalOpen,
    selectedMovie,
    isTyping,
    movieSearch,
    openModal,
    debounceGetMovies,
    closeModal,
    setIsTyping,
    isOpen,
    setIsOpen,
  };


};

export default useMovie;
