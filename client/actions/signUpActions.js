import Axios from "axios";

export function userSignUpRequest(userData) {
    return dispatch => {
        return Axios.post('/api/users', userData);
    }
}