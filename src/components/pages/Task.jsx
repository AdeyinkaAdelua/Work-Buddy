import React, { useState, useEffect, useCallback } from "react";
import "./Task.css";

// Task component
export const Task = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [newTodo, setNewTodo] = useState({ content: "", category: "", dueDate: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  // Sync todos and username with localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  // Handle new task creation
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newTodo.content || !newTodo.category) return;
    setTodos([...todos, { ...newTodo, done: false, createdAt: Date.now() }]);
    setNewTodo({ content: "", category: "", dueDate: "" });
  };

  // Toggle task completion (done)
  const handleToggleDone = useCallback((index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  }, [todos]);

  // Delete task
  const handleDeleteTodo = useCallback((index) => {
    setTodos(todos.filter((_, i) => i !== index));
  }, [todos]);

  // Clear completed tasks
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.done));
  };

  // Handle saving the edited task
  const handleEditSave = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].content = editedContent;
    setTodos(updatedTodos);
    setEditingIndex(null);
  };

  // Handle task editing (when clicked)
  const handleEditClick = (index, content) => {
    setEditingIndex(index);
    setEditedContent(content);
  };

  return (
    <main className="app">
      

      <section className="create-todo">
        <h3>Create a Task</h3>
        <form onSubmit={handleAddTodo}>
          <h4>What do you need to get done?</h4>
          <input
            type="text"
            placeholder="e.g. Get some milk"
            value={newTodo.content}
            onChange={(e) => setNewTodo({ ...newTodo, content: e.target.value })}
            required
          />

          <h4>Pick a category</h4>
          <div className="options">
            {["Xetech", "Basecamp", "Emails", "Personal"].map((category) => (
              <label key={category} className={category}>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={newTodo.category === category}
                  onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
                />
                <span className={`bubble ${category}`}></span> {category}
              </label>
            ))}
          </div>

          <h4>Set Due Date</h4>
          <input
            type="datetime-local"
            value={newTodo.dueDate}
            onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
          />
          <input type="submit" value="Add todo" />
        </form>
      </section>

      <section className="todo-list">
        <h3>Todo List</h3>
        <button onClick={handleClearCompleted}>Clear Completed</button>
        <div className="list">
          {todos.map((todo, index) => (
            <div key={index} className={`todo-item ${todo.category} ${todo.done ? "done" : ""}`}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleToggleDone(index)}
                />
                <span className={`bubble ${todo.category.toLowerCase()}`}></span>
              </label>

              <div className="todo-content">
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    onBlur={() => handleEditSave(index)}
                    onKeyDown={(e) => e.key === "Enter" && handleEditSave(index)}
                    autoFocus
                  />
                ) : (
                  <input type="text" value={todo.content} readOnly />
                )}
              </div>

              <div>
                <small className="due-date">
                  Due: {todo.dueDate ? new Date(todo.dueDate).toLocaleString() : "No due date"}
                </small>
              </div>

              <div className="actions">
                <button className="edit" onClick={() => handleEditClick(index, todo.content)}>
                  Edit
                </button>
                <button className="delete" onClick={() => handleDeleteTodo(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
