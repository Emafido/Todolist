import "./App.css";
import { useState, useEffect } from "react";

type Todo = {
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [inputValue, setInputValue] = useState<string>("");

  // Save whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Edit a todo
  const handleEdit = (index: number) => {
    const newValue = window.prompt("Edit todo", todos[index].text);
    if (newValue !== null) {
      const newTodos = todos.map((t, i) =>
        i === index ? { ...t, text: newValue } : t
      );
      setTodos(newTodos);
    }
  };

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index: number) => {
    const newTodos = todos.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTodos(newTodos);
  };

  return (
    <div className="flex justify-center flex-col items-center m-8 border rounded-2xl bg-[#fffbe6] p-4 md:p-6">
      <h1 className="text-2xl text-blue-400 md:text-3xl font-bold mt-6">
        My Daily Tasks
      </h1>

      <label className="relative my-5 flex items-center justify-center w-[220px] md:w-[400px]">
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-blue-400 pl-2 pr-10 py-1 rounded-[5px] w-full wrap-break-word"
        />
        <i
          className="fa-solid fa-circle-plus absolute right-4 cursor-pointer hover:text-blue-500"
          onClick={handleAdd}
        ></i>
      </label>

      <div className="w-full p-1 md:p-6 flex flex-col gap-2">
        {todos.map((todo, index) => (
          <div
            key={index}
            className="flex w-full justify-between items-start p-2 border border-blue-400 rounded-md items-center relative h-fit"
          >
            <div className="flex gap-5 items-start flex-1 min-w-0">
              <i
                className={`mt-1 cursor-pointer ${
                  todo.completed
                    ? "fa-solid fa-circle-check text-green-500"
                    : "fa-regular fa-circle text-blue-300"
                }`}
                onClick={() => toggleComplete(index)}
              ></i>

              <p
                className={`flex-1  wrap-break-word space ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </p>
            </div>

            {/* Edit / Delete */}
            <div className="flex gap-4 ml-4 mt-1">
              <i
                className="fa-solid fa-pen cursor-pointer hover:text-blue-500"
                onClick={() => handleEdit(index)}
              ></i>
              <i
                className="fa-solid fa-delete-left cursor-pointer hover:text-red-500"
                onClick={() => handleDelete(index)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
