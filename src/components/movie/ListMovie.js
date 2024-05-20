import CardMovie from "../card/CardMovie";

const ListMovie = ({
    movies,
    openModal,
    loading,
    saveMovieInLocalStorage,
    storedIds = [],
}) => {

    return (
        <div className="flex flex-row overflow-x-scroll scroll-visible">
            {!movies ? (
                <div className="w-full h-56  flex items-center justify-center text-2xl text-white font-bold">
                    <p>Information could not be loaded</p>
                </div>
            ) : (
                movies.content?.map((movie, index) => {
                    return (
                        <div
                            key={index}
                            className={`  ${index === 0 ? "ml-12" : "ml-5"} ${!loading ? "animate-fadeIn" : "animate-fadeOut"
                                } `}
                        >
                            <CardMovie
                                color={storedIds.find(movieF => movieF.imdbId === movie.imdbId) ? "#f34336" : "white"}
                                saveMovieInLocalStorage={saveMovieInLocalStorage}
                                openModal={openModal}
                                movie={movie}
                                loading={loading}
                            />
                        </div>
                    );
                })
            )}
        </div>
    );
};
export default ListMovie