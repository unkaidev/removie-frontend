import { useEffect, useState } from "react";
import { iconClose } from "../../svgs/icons";
import ProgressBar from "../progressBar/ProgressBar";
import InformationOption from "../informationOption/InformationOption";
import { NO_IMAGE } from '../../utils/constants/const';

const CardMovie = ({
    movie,
    openModal,
    saveMovieInLocalStorage,
    deleteMovieInLocalStorage,
    color,
    fav = false,
}) => {
    const releaseDate = new Date(movie.releaseDate);
    const formattedDate = releaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });

    const [movieIds, setMovieIds] = useState([]);
    const [infoOptionUpdated, setInfoOptionUpdated] = useState(false);

    useEffect(() => {
        const storedMovieIds = localStorage.getItem('moviesIds');
        if (storedMovieIds) {
            setMovieIds(JSON.parse(storedMovieIds));
        }
    }, [localStorage.getItem('moviesIds'), infoOptionUpdated]);

    let infoOptionColor = color;

    if (movieIds.some(movieId => movieId.imdbId === movie.imdbId)) {
        infoOptionColor = "red";
    }


    return (
        <div
            key={movie.imdbId}
            className="flex flex-col relative justify-between hover:cursor-pointer hover:scale-95 duration-300"
            onClick={() => openModal(movie)}
        >
            <div className="w-36 relative ">
                <img
                    loading="lazy"
                    className="object-cover rounded-xl w-64 h-56"
                    src={!movie ? NO_IMAGE : movie.poster}
                    alt={movie.title}
                />
                {fav ? (
                    <span
                        title="Remove to Watch List"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteMovieInLocalStorage(movie);
                        }}
                        className="absolute top-0 left-0 w-full flex justify-end"
                    >
                        {iconClose}
                    </span>
                ) : (
                    <span
                        title="Add to Watch List"
                        onClick={(e) => {
                            e.stopPropagation();
                            saveMovieInLocalStorage(movie);
                            setInfoOptionUpdated(true)
                        }}
                        className="absolute top-0 left-0 w-full flex justify-end"
                    >
                        <InformationOption key={infoOptionUpdated} color={infoOptionColor} />
                    </span>
                )}
                <div className="absolute -bottom-5 left-2">
                    <ProgressBar percent={movie.vote_average} />
                </div>
            </div>

            <div className="h-full flex flex-col justify-around items-center mt-5" style={{ maxWidth: "130px" }}>
                <p className="text-white font-bold text-center">{movie.title}</p>
                <p className="text-white text-sm font-light">{formattedDate}</p>
            </div>
        </div>
    );
};

export default CardMovie;

