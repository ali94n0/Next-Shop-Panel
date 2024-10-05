import { http } from "./httpService";

export const getAllUsersApi = () => {
	return http.get("/admin/user/list").then(({ data }) => data.data);
};

export const removeUserApi = (id) => {
	return http.delete(`/admin/user/profile/${id}`).then((res) => res.data);
};

export const removeProductApi = (id) => {
	return http.delete(`/admin/product/remove/${id}`).then((res) => res.data);
};

export const addProductApi = (data) => {
	return http.post("/admin/product/add", data).then((res) => res.data);
};

export const editProductApi = ({ id, data }) => {
	return http
		.patch(`/admin/product/update/${id}`, data)
		.then((res) => res.data);
};
