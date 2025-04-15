import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [todo, settodo] = useState(""); // Current input value
  const [todos, settodos] = useState([]); // List of todos
  const [isEditing, setIsEditing] = useState(false); // To track if we're editing
  const [editTodoId, setEditTodoId] = useState(null); // To track which todo we are editing

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      settodos(JSON.parse(storedTodos)); // Set state from local storage
    }
  }, []);

  // Save todos to local storage whenever 'todos' state changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Handle creating or updating a todo
  const handleCreate = () => {
    if (!todo.trim()) return; // Prevent adding empty todos

    if (isEditing) {
      const updatedTodos = todos.map((item) =>
        item.id === editTodoId ? { ...item, todo } : item
      );
      settodos(updatedTodos);
      setIsEditing(false);
      setEditTodoId(null);
    } else {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
      settodos(newTodos);
    }

    settodo(""); // Clear input field after adding/editing
  };

  // Handle editing a todo
  const handleEdit = (id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    if (todoToEdit) {
      settodo(todoToEdit.todo);
      setIsEditing(true);
      setEditTodoId(id);
    }
  };

  // Handle deleting a todo
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    settodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save to local storage
  };

  // Handle input change
  const handleChange = (e) => {
    settodo(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>To-Do List</h1>
        <div className="create">
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            placeholder="Create A Todo ......"
          />
          <button onClick={handleCreate}>{isEditing ? "SAVE" : "Create"}</button>
        </div>
        <div className="todos">
          <h2>Your To-Do's</h2>
          {todos.length === 0 ? <p>No todos yet.</p> : null}
          {todos.map((item) => (
            <div key={item.id} className="todo">
              <div className="text">
                <i>{item.todo}</i>
              </div>
              <div className="button">
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
