import { createRef } from "react";
import useMovie from "../hooks/movie";
import ModalMovie from "../components/movie/ModalMovie";
import Trending from "../layout/Trending";
import NowPlayingMovies from "../layout/NowPlayingMovies";
import Popular from "../layout/Popular";
import MoviesSearch from "../layout/MoviesSearch";

const Movies = ({
    moviesInWishList,
    StoredItems,
    setStoredItems,
    IsTyping,
    movieSearch,
}) => {
    const saveMovieInLocalStorage = (movie) => {
        if (StoredItems.find((movieStored) => movieStored.imdbId == movie.imdbId)) {
            return StoredItems;
        } else {
            const { imdbId, poster, trailerLink, overview, vote_average, title, releaseDate } = movie;
            const newMovie = {
                imdbId,
                poster,
                overview,
                vote_average,
                title,
                trailerLink,
                releaseDate,
                itemRef: createRef(null),
            };

            setStoredItems([
                ...StoredItems,
                newMovie,
            ]);
        }
    };

    const {
        closeModal,
        isModalOpen,
        openModal,
        selectedMovie,
    } = useMovie();

    return (
        <section>
            <ModalMovie
                moviesInWishList={moviesInWishList}
                closeModal={closeModal}
                isModalOpen={isModalOpen}
                selectedMovie={selectedMovie}
                setIsModalOpen={closeModal}
            />


            {IsTyping && (
                <MoviesSearch
                    saveMovieInLocalStorage={saveMovieInLocalStorage}
                    storedIds={StoredItems}
                    IsTyping={IsTyping}
                    movieSearched={movieSearch}
                    openModal={openModal}
                />
            )}
            <Trending
                saveMovieInLocalStorage={saveMovieInLocalStorage}
                typeTitle={"Trending"}
                openModal={openModal}
                storedIds={StoredItems}
            />
            <NowPlayingMovies
                saveMovieInLocalStorage={saveMovieInLocalStorage}
                openModal={openModal}
            />
            <Popular
                saveMovieInLocalStorage={saveMovieInLocalStorage}
                storedIds={StoredItems}
                openModal={openModal}
            />


        </section>
    );
};
export default Movies;
