import { useQueries } from "@tanstack/react-query";
import { getTodosById } from "../../services/api";

export const useGetTodosByIds = (ids: number[], enabled: boolean) => {
	return useQueries({
		queries: ids.map((id) => ({
			queryKey: ["todo", { id }],
			queryFn: () => getTodosById(id),
			enabled: enabled,
		})),
	});
};
