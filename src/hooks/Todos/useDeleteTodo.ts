import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TodoType } from "../../types/todos";
import { deleteTodo } from "../../services/api";

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["deleteTodo"],
		mutationFn: (data: TodoType) => deleteTodo(data),
		onSuccess: () => {
			console.log("onSuccess");
		},
		onSettled: async (_, error) => {
			if (error) {
				console.log("onSettled with error");
			} else {
				await queryClient.invalidateQueries({
					queryKey: ["todoIds"],
				});
			}
		},
	});
};
