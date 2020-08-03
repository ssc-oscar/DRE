import axios from 'axios';

export function lookupSha(sha, type) {
	return dispatch => {
		return axios.get('/api/lookup', {
			params: {
				sha1: sha,
				type: type,
				command: 'showCnt'
			}
		})
	}
}
