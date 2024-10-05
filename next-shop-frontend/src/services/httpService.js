const { default: axios } = require("axios");

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true, // send HttpOnly cookies
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
	async (error) => {
		const originalConfig = error.config;
		if (error?.response?.status === 401 && !originalConfig._retry) {
			originalConfig._retry = true; //only one time run
			try {
				const { data } = await http.get("/user/refresh-token");

				if (data) return instance(originalConfig); // request send again to api with new Tokens
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);
