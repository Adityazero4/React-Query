import { useState } from "react";
import { useGetProjects } from "../hooks/Projects/useGetProjects";

const Projects = () => {
	const [page, setPage] = useState(1);
	const { data, isPending, isError, error, isPlaceholderData, isFetching } =
		useGetProjects({ page });

	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-6">
			<h1 className="text-2xl font-bold text-center">Projects</h1>
			{isPending ? (
				<div className="text-2xl font-bold text-center">Loading...</div>
			) : isError ? (
				<div className="text-2xl font-bold text-center text-red-500">
					Error: {error.message}
				</div>
			) : (
				<div className="flex flex-col justify-center items-center gap-6">
					{data?.map((project) => (
						<div
							key={project.id}
							className="flex flex-row justify-center items-center gap-4"
						>
							<p>{project.id}</p>
							<p>{project.name}</p>
						</div>
					))}
					<span>Current Page: {page}</span>
					<div className="flex justify-center items-center gap-4">
						<button
							type="button"
							onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
							className="border-2 border-gray-500 p-2"
						>
							Previous Page
						</button>
						<button
							type="button"
							onClick={() => {
								if (!isPlaceholderData) {
									setPage((prev) => prev + 1);
								}
							}}
							disabled={isPlaceholderData}
							className="border-2 border-gray-500 p-2"
						>
							Next Page
						</button>
					</div>
					{isFetching && (
						<span className="text-2xl font-bold text-center">Fetching...</span>
					)}
				</div>
			)}
		</div>
	);
};

export default Projects;
