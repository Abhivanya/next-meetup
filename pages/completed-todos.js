import React, { useEffect, useState } from "react";

const completedTodos = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/get-todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);
  return (
    <div className="w-[80%] mx-auto my-9">
      <h1 className="text-2xl text-center font-bold underline underline-offset-4">
        Completed Todo
      </h1>
      <div className="w-[80%] mx-auto flex border-2 rounded-md p-4 flex-col gap-4 mt-7">
        {todos.map((todo) => (
          <>
            {todo.status !== "complete" && (
              <div
                key={todo.id}
                className="flex justify-between items-center w-full px-3 gap-3 bg-green-100 text-gray-700 p-4 rounded-md shadow-md shadow-green-500"
              >
                <div className={`font-bold  text-center mx-auto`}>
                  {todo.title}
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default completedTodos;
