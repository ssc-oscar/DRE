import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from '../actions/types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/users/login', data).then(res => {
      console.log(res);
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function userSignUpRequest(userData) {
  return dispatch => {
    return axios.post('/api/users/signup', userData).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
  }
}

export function submitAuthors(authors) {
  return dispatch => {
    return axios.post('/api/users/submit', authors);
  }
}

export function getAuthors(authorData) {
  return dispatch => {
    return axios.post('/api/users/search', authorData);
  }
}

// export function userSignUpRequest(userData) {
//   return dispatch => {
//     return fetch('/api/account/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: userData.email,
//         password: userData.password,
//         confirmPassword: userData.confirmPassword
//       }),
//     })
//   }
// }

// export function authorData(authorData) {
//   return dispatch => {
//     return fetch('/api/account/search', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: authorData.email,
//         additionalEmails: authorData.additionalEmails,
//         usernames: authorData.usernames,
//         fname: authorData.fname,
//         lname: authorData.lname
//       }),
//     })
// }
// }