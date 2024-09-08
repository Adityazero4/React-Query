import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../../services/api";
import type { TodoType } from "../../types/todos";

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["updateTodo"],
		mutationFn: (data: TodoType) => updateTodo(data),
		onSettled: async (_, error, variables) => {
			if (error) {
				console.log("onSettled with error");
			} else {
				await queryClient.invalidateQueries({
					queryKey: ["todoIds"],
				});
				await queryClient.invalidateQueries({
					queryKey: ["todo", { id: variables.id }],
				});
			}
		},
	});
};
