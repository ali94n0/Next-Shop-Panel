import { http } from "./httpService";

export const getOtpApi = (data) => {
	return http.post("/user/get-otp", data).then((res) => res.data);
};

export const checkOtpApi = (data) => {
	return http.post("/user/check-otp", data).then((res) => res.data);
};

export const completeProfileApi = (data) => {
	return http.post("/user/complete-profile", data).then((res) => res.data);
};

export const getUserProfileApi = () => {
	return http.get("/user/profile").then(({ data }) => data.data);
};

export const updateUserApi = (data) => {
	return http.patch("/user/update", data).then((res) => res.data);
};

export const logOutApi = () => {
	return http.post("/user/logout");
};
