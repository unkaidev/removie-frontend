import axios from "../setups/customize-axios";

const createReview = (reviewBody) => {
    return axios.post("/api/v1/reviews", { ...reviewBody });
}
export {
    createReview
}