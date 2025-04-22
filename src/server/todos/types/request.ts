export interface GetTodoRequest {
    _id: string;
}

export interface AddTodoRequest {
    title: string;
}

export interface UpdateTodoRequest {
    _id: string;
    title: string;
}
