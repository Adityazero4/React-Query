import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TodoType } from "../../types/todos";
import { createTodo } from "../../services/api";

export const useCreateTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["createTodo"],
		mutationFn: (data: TodoType) => createTodo(data),
		onMutate: () => {
			console.log("onMutate");
		},
		onError: () => {
			console.log("onError");
		},
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
