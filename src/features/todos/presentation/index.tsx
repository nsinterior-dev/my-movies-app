import React from 'react';
import { TodoList } from './list';
import { TodoForm } from './form';

export const Todos = () => {
  return [<TodoForm key='todo-form' />, <TodoList key='todo-list' />];
};
