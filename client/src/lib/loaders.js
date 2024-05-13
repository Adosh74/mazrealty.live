import { defer } from 'react-router-dom';
import apiRequest from './apiRequest';

export const singlePageLoader = async ({ request, params }) => {
	try {
		const res = await apiRequest.get(`/properties/${params.id}`);
		return res.data.data.data;
	} catch (error) {
		return null;
	}
};

export const listPageLoader = async ({ request, params }) => {
	const query = request.url.split('?')[1];

	const res = !query
		? apiRequest.get(`/properties`)
		: apiRequest.get(`properties?${query}`);
	return defer({
		properties: res.then((res) => res.data.data.data),
	});
};

export const myFavoritesLoader = async ({ request, params }) => {
	const res = apiRequest.get('/favorites');
	return defer({
		favorites: res.then((res) => res.data.data.favorites),
	});
};

export const myPropertiesLoader = async ({ request, params }) => {
	const res = apiRequest.get('/properties/my-properties');
	const chatRes = apiRequest.get('/chats');
	return defer({
		properties: res.then((res) => res.data.data.properties),
		chatResponse: chatRes,
	});
};
