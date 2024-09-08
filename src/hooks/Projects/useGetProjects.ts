import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProjects } from "../../services/api";

type ProjectProp = {
	page?: number;
};

export const useGetProjects = ({ page = 1 }: ProjectProp) => {
	return useQuery({
		queryKey: ["projects", { page }],
		queryFn: () => getProjects(page),
		placeholderData: keepPreviousData,
	});
};
