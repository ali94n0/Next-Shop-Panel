import { getOtpApi } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetOtp = () =>
	useMutation({
		mutationFn: getOtpApi,
		onSuccess: (res) => {
			toast.success(res?.data?.message);
		},
		onError: (err) => {
			toast.error(err?.response?.data?.messasge);
		},
	});
