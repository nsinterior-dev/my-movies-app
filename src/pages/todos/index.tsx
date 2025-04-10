import React, { useActionState, useState } from "react";

type Todo = { id: string; title: string };

async function handleTodos(prev: Todo[], formData: FormData): Promise<Todo[]> {
  const intent = formData.get("intent");

  console.log({intent})
  
  if (intent === "add") {
    const title = formData.get("title") as string;
    if (!title) return prev;
    return [...prev, { id: crypto.randomUUID(), title }];
  }

  if (intent === "remove") {
    const id = formData.get("id") as string;
    return prev.filter((todo) => todo.id !== id);
  }

  return prev;
}

const Todos = () => {
  const [todos, formAction] = useActionState(handleTodos, []);
  const [input, setInput] = useState("");

  const handleRemove = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("intent", "remove");
    formAction(formData);
  };

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
          
            <form onSubmit={(e) => handleRemove(e, todo.id)} method="post">
              {todo.title}              
              <input type="hidden" name="id" value={todo.id} />
              <button type="submit" name="intent" value="remove">Remove</button>
            </form>
          </li>
        ))}
      </ul>

      <form action={formAction} method="post" onSubmit={() => setInput("")}>
        <input
          type="text"
          name="title"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" name="intent" value="add">Add</button>
      </form>
    </div>
  );
};

export default Todos;
