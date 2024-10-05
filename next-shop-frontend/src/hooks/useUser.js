import {
	completeProfileApi,
	getUserProfileApi,
	logOutApi,
	updateUserApi,
} from "@/services/authService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCompleteProfile = () =>
	useMutation({
		mutationFn: completeProfileApi,
		onSuccess: (res) => {
			toast.success(res?.data?.message);
		},
		onError: (err) => {
			toast.error(err?.response?.data?.message);
		},
	});

export const useUserProfile = () =>
	useQuery({
		queryKey: ["get-user"],
		queryFn: getUserProfileApi,
		retry: false,
		refetchOnWindowFocus: true,
	});

export const useUserUpdate = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateUserApi,
		onSuccess: (res) => {
			toast.success(res?.data?.message);
			queryClient.invalidateQueries(["get-user"]);
		},
		onError: (err) => {
			toast.error(err?.response?.data?.message);
		},
	});
};

export const useLogout = () => useMutation({
	mutationFn: logOutApi,
	onSuccess:(res)=>{
		toast.success("از حساب کاربری با موفقیت خارج شدید")
	},
	onError: (err) => {
		toast.error(err?.response?.data?.message)
	}
})
