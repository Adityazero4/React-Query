import React, { Fragment, useState } from "react";
import { useGetProducts } from "../hooks/Products/useGetProducts";
import { useGetProductFromId } from "../hooks/Products/useGetProductFromId";

const Products = () => {
	const productsQuery = useGetProducts();

	const [selectedProductId, setSelectedProductId] = useState<number | null>(
		null,
	);

	const productQuery = useGetProductFromId({
		id: selectedProductId,
	});

	if (productsQuery.isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{productsQuery.data?.pages.map((group, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<Fragment key={index}>
					{group.map((product) => (
						<Fragment key={product.id}>
							<button
								type="button"
								onClick={() => {
									setSelectedProductId(product.id);
								}}
							>
								{product.name}
							</button>
							<br />
						</Fragment>
					))}
				</Fragment>
			))}
			<br />
			<button
				type="button"
				onClick={() => {
					productsQuery.fetchNextPage();
				}}
				disabled={
					productsQuery.isFetchingNextPage || !productsQuery.hasNextPage
				}
			>
				{productsQuery.isFetchingNextPage
					? "Loading More..."
					: productsQuery.hasNextPage
						? "Load More"
						: "Nothing more to Load"}
			</button>

			<div>Selected Prdoduct:</div>
			{JSON.stringify(productQuery.data)}
		</div>
	);
};

export default Products;
