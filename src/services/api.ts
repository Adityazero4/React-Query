import axios from "axios";
import type { TodoType } from "../types/todos";
import type { ProjectsType } from "../types/projects";
import type { ProductType } from "../types/products";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({
	baseURL: BASE_URL,
});

export const getTodoIds = async () => {
	return (await axiosInstance.get<TodoType[]>("/todos")).data.map(
		(todo) => todo.id,
	);
};

export const getTodosById = async (id: number) => {
	return (await axiosInstance.get<TodoType>(`/todos/${id}`)).data;
};

export const getTodos = async () => {
	return (await axiosInstance.get<TodoType[]>("/todos")).data;
};

export const createTodo = async (todo: TodoType) => {
	return (await axiosInstance.post<TodoType>("/todos", todo)).data;
};

export const updateTodo = async (todo: TodoType) => {
	return (await axiosInstance.put<TodoType>(`/todos/${todo.id}`, todo)).data;
};

export const deleteTodo = async (todo: TodoType) => {
	return await axiosInstance.delete(`/todos/${todo.id}`);
};

export const getProjects = async (pageParam: number) => {
	return (
		await axiosInstance.get<ProjectsType[]>(
			`/projects?_page=${pageParam}&_limit=3`,
		)
	).data;
};

export const getProducts = async ({
	pageParam,
}: {
	pageParam: number;
}) => {
	return (
		await axiosInstance.get<ProductType[]>(
			`/products?_page=${pageParam + 1}&_limit=3`,
		)
	).data;
};

export const getProduct = async (id: number) => {
	return (await axiosInstance.get<ProductType>(`/products/${id}`)).data;
};
