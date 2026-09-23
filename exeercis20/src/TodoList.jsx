import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "hey whtsapp", completed: false },
    { id: 2, text: "how are yu doing", completed: true },
    { id: 3, text: "This is cool right ?", completed: false },
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
    <div className="min-h-screen bg-[#f0edfe] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl p-8 shadow-sm w-full max-w-[440px]">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-slate-800 mb-6">
          My Todo List
        </h1>

        {/* Input & Add Button */}
        <form onSubmit={handleAddTodo} className="flex gap-3 mb-6">
          <input
            type="text"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-500 placeholder:text-gray-400"
            placeholder="Add a new todo..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Add
          </button>
        </form>

        {/* Todo Items List */}
        <div className="flex flex-col gap-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                todo.completed ? "bg-slate-100" : "bg-[#f8fafc]"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
                <span
                  className={`text-sm ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-slate-700"
                  }`}
                >
                  {todo.text}
                </span>
              </div>

              {todo.completed && (
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-600 hover:underline text-sm font-medium px-2"
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
