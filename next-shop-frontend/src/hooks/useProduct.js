import { likeProductApi } from "@/services/productService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLikeProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: likeProductApi,
		onSuccess: (res) => {
			toast.success(res?.data?.message);
			queryClient.invalidateQueries(["get-allproducts"]);
		},
		onError: (err) => {
			toast.error(err?.response?.data?.message);
		},
	});
};
