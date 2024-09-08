import { type SubmitHandler, useForm } from "react-hook-form";
import type { TodoType } from "../types/todos";
import {
	useCreateTodo,
	useDeleteTodo,
	useGetTodoIds,
	useGetTodosByIds,
	useUpdateTodo,
} from "../hooks/Todos";

const Todo = () => {
	// const todosQuery = useGetTodos();
	// const isFetching = useIsFetching(); // returns the number of queries that are currently fetching

	const todoIdsQuery = useGetTodoIds();
	const todosQuery = useGetTodosByIds(
		todoIdsQuery.data ?? [],
		todoIdsQuery.isSuccess,
	);

	const createTodo = useCreateTodo();
	const updateTodoMutation = useUpdateTodo();
	const deleteTodoMutation = useDeleteTodo();

	const handleCreateTodo: SubmitHandler<TodoType> = (data) => {
		createTodo.mutate(data);
	};

	const handleUpdateTodo = (data: TodoType) => {
		updateTodoMutation.mutate({
			...data,
			checked: !data.checked,
		});
	};

	const handleDeleteTodo = async (data: TodoType) => {
		await deleteTodoMutation.mutateAsync(data);
		console.log("Deleted");
	};

	// if (todosQuery.isPending) {
	// 	return <span>Loading...</span>;
	// }

	// if (todosQuery.isError) {
	// 	return <span>Error: {todosQuery.error.message}</span>;
	// }

	const { register, handleSubmit } = useForm<TodoType>();

	return (
		<ul>
			{/* <p>Global isFetching:{isFetching}</p>
			<p>{todosQuery.fetchStatus}</p>
			<p>{todosQuery.status}</p> */}

			<form onSubmit={handleSubmit(handleCreateTodo)}>
				<h1>New Todo</h1>
				<input {...register("title")} placeholder="Title" />
				<br />
				<input {...register("description")} placeholder="Description" />
				<br />
				<button type="submit" disabled={createTodo.isPending}>
					{createTodo.isPending ? "Creating..." : "Create"}
				</button>
			</form>

			{todosQuery?.map(({ data }) => (
				<li key={data?.id}>
					<div>Id: {data?.id}</div>
					<span>
						<strong>Titile: {data?.title}</strong>{" "}
						<strong>Description: {data?.description}</strong>
					</span>
					<button
						type="submit"
						disabled={updateTodoMutation.isPending || data?.checked}
						onClick={() => data && handleUpdateTodo(data)}
					>
						{data?.checked ? "Done" : "Mark as Done"}
					</button>
					<button
						type="submit"
						disabled={deleteTodoMutation.isPending}
						onClick={() => data && handleDeleteTodo(data)}
					>
						Delete
					</button>
				</li>
			))}
		</ul>
	);
};

export default Todo;
