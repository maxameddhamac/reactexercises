import { useState } from "react";
import styles from "./TodoList.module.css";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "soo kac xili hore", completed: false },
    { id: 2, text: "seexo xili hore", completed: true },
    { id: 3, text: "wax baro ", completed: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>My Todo List</h1>

        <form onSubmit={handleAddTodo} className={styles.inputGroup}>
          <input
            type="text"
            className={styles.input}
            placeholder="Add a new todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className={styles.addButton}>
            Add
          </button>
        </form>

        <div className={styles.list}>
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`${styles.item} ${
                todo.completed ? styles.completedItem : ""
              }`}
            >
              <div className={styles.todoContent}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className={styles.checkbox}
                />
                <span
                  className={`${styles.text} ${
                    todo.completed ? styles.completedText : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              {todo.completed && (
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
