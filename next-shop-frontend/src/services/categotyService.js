import { http } from "./httpService";

export const getCategoriesApi = () => {
	return http.get("/category/list").then(({ data }) => data.data);
};
