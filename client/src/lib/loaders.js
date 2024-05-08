import { defer } from 'react-router-dom';
import apiRequest from './apiRequest';

export const singlePageLoader = async ({ request, params }) => {
	const res = await apiRequest.get(`/properties/${params.id}`);
	return res.data.data.data;
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
