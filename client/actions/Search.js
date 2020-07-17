import axios from 'axios';

export function lookupSha(sha, type) {
	return dispatch => {
		return axios.get('/api/lookup', {
			params: {
				sha1: sha,
				type: type
			}
		})
	}
}

/*export function lookupSha() {
	return dispatch => {
		return axios.get('/api/lookup', {
			params: {
				sha1: '009d7b6da9c4419fe96ffd1fffb2ee61fa61532a',
				type: 'commit'
			}
		})
		.then(function (response) {
			console.log(response);
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}
*/
