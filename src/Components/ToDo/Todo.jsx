import React, { useState, useEffect, useContext } from "react";
import { ListTodo } from "lucide-react";
import { ThemeContext } from "../../Context/ThemeContext";

const LOCAL_KEY = "todos";

const Todo = () => {
  const { theme, themes } = useContext(ThemeContext);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [editText, setEditText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem(LOCAL_KEY);
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    const newTodo = {
      id: Date.now(),
      todotext: todo.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleCompletion = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const startEditing = (id, text) => {
    setEditedTodo(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, todotext: editText.trim() } : t
      )
    );
    setEditedTodo(null);
    setEditText("");
  };

  return (
    <div className="fixed top-5 right-36 z-50 flex flex-col items-end space-y-2 transition-transform transform hover:scale-120">
      <button
        className="rounded-lg shadow-md p-2 flex items-center justify-center w-10 h-10"
        style={{ backgroundColor: themes[theme].button, color: "white" }}
        onClick={() => setIsVisible(!isVisible)}
      >
        <ListTodo size={24} />
      </button>

      {isVisible && (
        <div
          className="w-[350px] rounded-lg p-4 shadow-lg"
          style={{ backgroundColor: themes[theme].bg, color: "white" }}
        >
          <h3 className="text-center text-lg font-bold mb-3">Todos</h3>

          <form onSubmit={addTodo} className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Enter a todo..."
              className="flex-1 px-3 py-2 border rounded"
              style={{
                backgroundColor: themes[theme].inputBg,
                color: "black",
                borderColor: themes[theme].button,
              }}
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 py-2 rounded text-white"
              style={{ backgroundColor: themes[theme].button }}
            >
              Add +
            </button>
          </form>

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
                    color: "black",
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
                        className="px-2 py-1 rounded text-white"
                        style={{ backgroundColor: themes[theme].button }}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(t.id, t.todotext)}
                          className="px-2 py-1 rounded text-white"
                          style={{ backgroundColor: themes[theme].button }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTodo(t.id)}
                          className="px-2 py-1 rounded text-white"
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
      )}
    </div>
  );
};

export default Todo;
