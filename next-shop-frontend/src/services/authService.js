import { http } from "./httpService";

export const getOtpApi = (data) => {
	return http.post("/user/get-otp", data).then((res) => res.data);
};

export const checkOtpApi = (data) => {
	return http.post("/user/check-otp", data).then((res) => res.data);
};
