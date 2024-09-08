import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct } from "../../services/api";
import type { ProductType } from "../../types/products";

export const useGetProductFromId = ({
	id,
}: {
	id: number | null;
}) => {
	const queryClient = useQueryClient();
	return useQuery({
		queryKey: ["products", { id }],
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		queryFn: () => getProduct(id!),
		enabled: !!id,
		placeholderData: () => {
			const cachedProducts = (
				queryClient.getQueryData(["products"]) as {
					pages: ProductType[] | undefined;
				}
			)?.pages?.flat(2);

			if (cachedProducts) {
				return cachedProducts.find((item) => item.id === id);
			}
		},
	});
};
