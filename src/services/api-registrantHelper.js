import axios from 'axios';

const api = axios.create({
	baseURL: 'URL from heroku', // Add URL after heroku deployment
});

export const getAllRegistrants = async () => {
	const resp = await api.get('/registrants');
	return resp.data;
};

export const deleteRegistrant = async (id) => {
	const resp = await api.delete(`/registrants/${id}`);
	return resp.data;
};

export const createRegistrant = async (registrant) => {
	const resp = await api.post('/registrants', registrant);
	return resp.data;
};

export const updateRegistrant = async (id, registrant) => {
	const resp = await api.put(`/registrants/${id}`, registrant);
	return resp.data;
};
