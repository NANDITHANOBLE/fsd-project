import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todoObj) => {
    setTodos([
      ...todos,
      { id: uuidv4(), ...todoObj, completed: false, isEditing: false },
    ]);
  }

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (updated, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updated, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>ListTodoApp</h1>
      <div className="project-description">
        A simple, beautiful, and interactive to-do list app. Organize your tasks, stay productive, and never miss a thing!
      </div>
      <TodoForm addTodo={addTodo} />
      <div style={{color:'#fff', marginBottom:'1rem', fontSize:'1rem'}}>
        {todos.filter(todo => !todo.completed).length} task(s) left
      </div>
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};