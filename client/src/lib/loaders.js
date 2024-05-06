import apiRequest from './apiRequest';

export const singlePageLoader = async ({ request, params }) => {
	const res = await apiRequest.get(`properties/${params.id}`);
	return res.data.data.data;
};
