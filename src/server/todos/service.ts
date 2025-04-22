import { apiRequest } from '../apiRequest';
import { Todo } from './types/model';
import {
  AddTodoRequest,
  GetTodoRequest,
  UpdateTodoRequest,
} from './types/request';
const ENDPOINT = '/api/todos';

export function createTodo(payload: AddTodoRequest) {
  return apiRequest<AddTodoRequest, void>(ENDPOINT, 'post', payload);
}

export function listTodos() {
  return apiRequest<void, Todo[]>(ENDPOINT, 'get');
}

export function getTodo(payload: GetTodoRequest) {
  return apiRequest<GetTodoRequest, Todo>(`${ENDPOINT}/${payload._id}`, 'get');
}

export function updateTodo(payload: UpdateTodoRequest) {
  return apiRequest<UpdateTodoRequest, void>(
    `${ENDPOINT}/${payload._id}`,
    'put',
    payload
  );
}

export function deleteTodo(payload: GetTodoRequest) {
  return apiRequest<GetTodoRequest, void>(
    `${ENDPOINT}/${payload._id}`,
    'delete'
  );
}
