import { useQuery } from "@tanstack/react-query";
import { getTodoIds } from "../../services/api";

export const useGetTodoIds = () => {
	return useQuery({
		queryKey: ["todoIds"],
		queryFn: getTodoIds,
	});
};
