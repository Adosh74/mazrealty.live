import axios from 'axios';

const apiRequest = axios.create({
	baseURL: '/api/v1',
	withCredentials: true,
});

export default apiRequest;
