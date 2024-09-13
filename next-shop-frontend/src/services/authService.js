import { http } from "./httpService";

export const getOtpApi = (data) => {
	return http.post("/user/get-otp", data).then((res) => res.data);
};
