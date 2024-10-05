import { getCategoriesApi } from "@/services/categotyService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () =>
	useQuery({
		queryKey: ["get-categories"],
		queryFn: getCategoriesApi,
		retry: false,
		refetchOnWindowFocus: true,
	});
