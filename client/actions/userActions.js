import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from '../actions/types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export function getProfile(id) {
  return dispatch => {
    return axios.get(`/api/users/profile/${id}`);
  }
}

export function getAllUsers() {
  return dispatch => {
    return axios.post(`/api/users/locate`);
  }
}

export function getUser(id) {
  return dispatch => {
    return axios.get(`/api/users/user/${id}`).then(res => {
      const token = res.data.token;
      dispatch(setCurrentUser(jwt.decode(token)));
    })
  }
}