import { http } from "./httpService";

export const addToCartApi = (productId) => {
	return http.post("/cart/add", { productId }).then((res) => res.data);
};

export const removeCartApi = (productId) => {
	return http.post("/cart/remove", { productId }).then((res) => res.data);
};
