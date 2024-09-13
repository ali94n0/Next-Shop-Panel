const { default: axios } = require("axios");

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

export const http = {
	get: instance.get,
	post: instance.post,
	put: instance.put,
	delete: instance.delete,
	patch: instance.patch,
};

axios.interceptors.request.use(
	(req) => req,
	(error) => Promise.reject(error),
);

axios.interceptors.response.use(
	(res) => res,
	(error) => Promise.reject(error),
);
