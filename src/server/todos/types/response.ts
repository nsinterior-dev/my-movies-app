import { Todo } from "./model";

export interface GetTodoResponse{
    todo: Todo;
}
export interface TodoListResponse {
    todos: Todo[];
}