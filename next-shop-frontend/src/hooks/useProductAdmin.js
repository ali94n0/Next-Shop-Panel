import {
	addProductApi,
	editProductApi,
	removeProductApi,
} from "@/services/adminService";
import { getProductByIdApi, getProductsApi } from "@/services/productService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAllProducts = () =>
	useQuery({
		queryKey: ["get-allproducts"],
		queryFn: getProductsApi,
		retry: false,
		refetchOnWindowFocus: true,
	});

export const useRemoveProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: removeProductApi,
		onSuccess: (res) => {
			toast.success(res?.data?.message);
			queryClient.invalidateQueries(["get-allproducts"]);
		},
		onError: (err) => {
			toast.error(err?.response?.data?.message);
		},
	});
};

export const useAddProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addProductApi,
		onSuccess: (res) => {
			toast.success(res?.data?.message);
			queryClient.invalidateQueries(["get-allProducts"]);
		},
		onError: (err) => {
			toast.error(err?.response?.data?.message);
		},
	});
};

export const useGetProductById = (id) =>
	useQuery({
		queryKey: ["single-product", id],
		queryFn: () => getProductByIdApi(id),
		retry: false,
		refetchOnWindowFocus: true,
	});

export const useEditProduct = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: editProductApi,
		onSuccess: (res) => {
			toast.success(res?.data?.message);
			queryClient.invalidateQueries(["get-allProducts", "single-product"]);
		},
		onError: (err) => {
			toast.error(err?.response?.data?.message);
		},
	});
};
