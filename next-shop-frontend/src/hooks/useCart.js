import { addToCartApi, removeCartApi } from "@/services/cartService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddToCart = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addToCartApi,
		onSuccess: (res) => {
			toast.success(res?.data?.message);
			queryClient.invalidateQueries(["get-user"]);
		},
		onError: (err) => {
			toast.error(err?.response?.data?.message);
		},
	});
};

export const useRemoveItem = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: removeCartApi,
		onSuccess: (res) => {
			toast.success(res?.data?.message);
			queryClient.invalidateQueries(["get-user"]);
		},
		onError: (err) => {
			toast.error(err?.response?.data?.message);
		},
	});
};
