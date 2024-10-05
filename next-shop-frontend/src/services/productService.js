import { data } from "autoprefixer";
import { http } from "./httpService";

export const getProductsApi = (queryString, cookies) => {
	return http
		.get(`/product/list?${queryString}`, {
			headers: {
				Cookie: cookies,
			},
		})
		.then(({ data }) => data.data);
};

export const getSingleProductApi = (slug) => {
	return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
};

export const likeProductApi = (id) => {
	return http.post(`/product/like/${id}`).then((res) => res.data);
};

export const getProductByIdApi = (id) => {
	return http.get(`/product/${id}`).then(({ data }) => data.data);
};
