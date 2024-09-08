import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/api";

export const useGetProducts = (page?: number) => {
	return useInfiniteQuery({
		queryKey: ["products"],
		queryFn: getProducts,
		initialPageParam: 0,
		getNextPageParam: (lastPage, __, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + 1;
		},
		getPreviousPageParam: (_, __, firstPageParam) => {
			if (firstPageParam <= 1) {
				return undefined;
			}
			return firstPageParam - 1;
		},
	});
};
