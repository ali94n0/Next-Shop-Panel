import { http } from "./httpService";

export const createPaymentApi = () => {
	return http.post("/payment/create").then((res) => res.data);
};
