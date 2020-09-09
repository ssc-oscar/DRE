import axios from 'axios';

export function lookupSha(sha, type, command) {
	return dispatch => {
		return axios.get('/api/lookup', {
			params: {
				sha1: sha,
				type: type,
				command: command
			}
		})
	}
}

export function clickhouseQuery(start, end, count) {
	return dispatch => {
		return axios.get('/api/clickhouse/commits', {
			params: {
				start: start,
				end: end,
				count: count
			}
		})
	}
}
