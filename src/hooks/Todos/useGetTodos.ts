import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../services/api";

export const useGetTodos = () => {
	return useQuery({
		queryKey: ["todos"],
		queryFn: getTodos,
	});
};
