import { getAllUsersApi, removeUserApi } from "@/services/adminService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUsersList = () =>
	useQuery({
		queryKey: ["get-users-admin"],
		queryFn: getAllUsersApi,
		retry: false,
		refetchOnWindowFocus: true,
	});

export const useRemoveUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: removeUserApi,
		onSuccess: (res) => {
			toast.success(res?.data?.message);
			queryClient.invalidateQueries();
		},
		onError: (err) => {
			toast.error(err?.response?.data?.message);
		},
	});
};
