import axios from 'axios';

export function getSampling(restrictions) {
  return dispatch => {
    return axios.post('/api/sampling', restrictions);
  }
}

