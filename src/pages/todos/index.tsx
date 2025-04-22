import React, { useEffect, useReducer, useState } from 'react';
import { listTodos, createTodo, deleteTodo, Todo } from '@/server'; // Import your service functions

import { Todos as TodoComp } from '@/features/todos/presentation';

type Action =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'REMOVE_TODO'; payload: string };

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'REMOVE_TODO':
      return state.filter((todo) => todo._id !== action.payload);
    default:
      return state;
  }
}

const Todos = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [input, setInput] = useState('');

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await listTodos();
        dispatch({ type: 'SET_TODOS', payload: fetchedTodos });
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // Handle adding a new todo
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const newTodo = { _id: crypto.randomUUID(), title: input };
      await createTodo({ title: input });
      dispatch({ type: 'ADD_TODO', payload: newTodo }); // Optimistic update
      setInput('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  // Handle removing a todo
  const handleRemove = async (_id: string) => {
    try {
      await deleteTodo({ _id });
      dispatch({ type: 'REMOVE_TODO', payload: _id }); // Optimistic update
    } catch (error) {
      console.error('Failed to remove todo:', error);
    }
  };

  return (
    <div>

    <TodoComp />
    <h1>Todos</h1>
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRemove(todo._id);
            }}
          >
            {todo.title}
            <button type='submit'>Remove</button>
          </form>
        </li>
      ))}
    </ul>

    <form onSubmit={handleAdd}>
      <input
        type='text'
        name='title'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type='submit'>Add</button>
    </form>
  </div>
  );
};

export default Todos;
