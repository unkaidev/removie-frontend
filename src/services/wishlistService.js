import axios from "../setups/customize-axios";


const fetchMoviesInWishList = (username) => {
    return axios.get(`/api/v1/wishlist/list?username=${username}`)
}
const addMovieToWishList = (username, imdbId) => {
    return axios.post(`/api/v1/wishlist/${imdbId}/add?username=${username}`)
}
const removeMovieToWishList = (username, imdbId) => {
    return axios.post(`/api/v1/wishlist/${imdbId}/remove?username=${username}`)
}

export {
    fetchMoviesInWishList, addMovieToWishList, removeMovieToWishList
}