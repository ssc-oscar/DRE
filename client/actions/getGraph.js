import axios from 'axios';

export function getGraphData(params) {
	return axios.get('/api/getGraphData', {params});
}
