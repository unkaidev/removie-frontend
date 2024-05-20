import axios from "../setups/customize-axios";

const fetchAllMovies = () => {
    return axios.get("/api/v1/movies")
}
const fetchAMovie = (movieId) => {
    return axios.get(`/api/v1/movies/${movieId}`)
}
const fetchAMovieCredit = (movieId) => {
    return axios.get(`/api/v1/movies/${movieId}/credit`)
}
const fetchMoviesUpcoming = () => {
    return axios.get(`/api/v1/movies/upcoming`)
}
const fetchMoviesPopular = () => {
    return axios.get(`/api/v1/movies/popularity`)
}
const fetchMoviesTrending = (dateInput) => {
    return axios.get(`/api/v1/movies/trending/${dateInput}`)
}
const searchMoviesByTitle = (movieSearched) => {
    return axios.get(`/api/v1/movies/search/${movieSearched}`)
}
const searchMoviesRating = (imdbId) => {
    return axios.get(`/api/v1/movies/${imdbId}/rating`);
}
const rateMovie = (imdbId, rating) => {
    return axios.post(`/api/v1/movies/${imdbId}/rating?rating=${rating}`);
}
export {
    fetchAllMovies, fetchAMovie, fetchAMovieCredit, searchMoviesRating, rateMovie,
    fetchMoviesPopular, fetchMoviesUpcoming, fetchMoviesTrending, searchMoviesByTitle
}