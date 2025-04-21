import React, { useEffect, useState } from 'react';
import { listTodos, createTodo, deleteTodo, Todo } from '@/api'; // Import your service functions

// type Todo = { id: string; title: string };

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await listTodos();
        setTodos(fetchedTodos);
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
      await createTodo({ title: input });
      setTodos((prev) => [...prev, { _id: crypto.randomUUID(), title: input }]); // Optimistic update
      setInput('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  // Handle removing a todo
  const handleRemove = async (_id: string) => {
    try {
      await deleteTodo({ _id });
      setTodos((prev) => prev.filter((todo) => todo._id !== _id)); // Optimistic update
    } catch (error) {
      console.error('Failed to remove todo:', error);
    }
  };

  return (
    <div>
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
