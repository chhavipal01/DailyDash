import React, { useEffect, useState, useContext } from "react";
import { ListTodo } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

const Todo = () => {
  const { theme, themes } = useContext(ThemeContext); // Get theme from context
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });
  const [editedTodo, setEditedTodo] = useState(null);
  const [editText, setEditText] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Toggle visibility

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    const newTodo = {
      id: Date.now(),
      todotext: todo.trim(),
      completed: false, // Default completion status is false
    };

    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (id, text) => {
    setEditedTodo(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, todotext: editText.trim() } : todo
      )
    );
    setEditedTodo(null);
    setEditText("");
  };

  return (
    <div className="relative">
      {/* Todo Button */}
      <button
        className="fixed top-4 right-32  rounded-lg shadow-md p-2  transition hover:bg-opacity-80 flex items-center justify-center w-10 h-10"
        style={{
          backgroundColor: themes[theme].button,
          color: "white", // Ensuring text color is white
        }}
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Close" : <span className="flex items-center gap-1"><ListTodo /></span>}
      </button>

      {isVisible && (
        <div className="flex ">
          <div
            className="w-[350px] rounded-lg p-4 shadow-lg"
            style={{
              backgroundColor: themes[theme].bg,
              color: "white", // Ensuring text color is white everywhere inside
            }}
          >
            <h3 className="text-center text-lg font-bold mb-3">Todos</h3>

            {/* Todo Form */}
            <form onSubmit={addTodo} className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Enter a todo..."
                className="flex-1 px-3 py-2 border rounded focus:ring-2 outline-none"
                style={{
                  backgroundColor: themes[theme].inputBg,
                  color: "black", // White text inside the input
                  borderColor: themes[theme].button,
                }}
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
                style={{
                  backgroundColor: themes[theme].button,
                  color: "white", // White text on button
                }}
              >
                Add +
              </button>
            </form>

            {/* Todo List */}
            <ul className="space-y-2">
              {todos.length > 0 ? (
                todos.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center p-2 rounded"
                    style={{
                      backgroundColor: t.completed
                        ? themes[theme].button
                        : themes[theme].bg,
                      color: "black", // White text for each todo item
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleCompletion(t.id)}
                      className="mr-2 accent-green-500"
                    />

                    {editedTodo === t.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit(t.id)}
                        className="flex-1 px-2 py-1 bg-gray-700 text-white rounded"
                      />
                    ) : (
                      <span
                        className={`flex-1 ${
                          t.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {t.todotext}
                      </span>
                    )}

                    <div className="flex gap-1">
                      {editedTodo === t.id ? (
                        <button
                          onClick={() => saveEdit(t.id)}
                          className="bg-green-500 px-2 py-1 rounded hover:bg-green-600"
                          style={{ backgroundColor: themes[theme].button }}
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(t.id, t.todotext)}
                            className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                            style={{ backgroundColor: themes[theme].button }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTodo(t.id)}
                            className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                            style={{ backgroundColor: themes[theme].button }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-400">No todos yet.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
