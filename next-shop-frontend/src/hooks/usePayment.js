import { createPaymentApi } from "@/services/paymentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreatePayment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createPaymentApi,
		onSuccess: (res) => {
			toast.success(res?.data?.message);
			queryClient.invalidateQueries(["get-user"]);
		},
		onError: (err) => {
			toast.error(err?.response?.data?.meessage);
		},
	});
};
