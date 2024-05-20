import axios from "../setups/customize-axios";

const loginUser = (username, password) => {
    const loginRequest = {
        "username": username,
        "password": password
    };
    return axios.post(`/api/auth/signin`, loginRequest)
}
const logoutUser = () => {
    return axios.post(`/api/auth/signout`);
}
const registerNewUser = (username, email, password) => {
    const signUpRequest = {
        "username": username,
        "email": email,
        "password": password
    };
    return axios.post(`/api/auth/signup`, signUpRequest)
}
export {
    loginUser, logoutUser, registerNewUser
}