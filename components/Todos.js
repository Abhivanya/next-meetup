"use client";
import { useRef } from "react";
import TodoList from "./TodoList";

const Todos = ({
  handleAdd,
  handleUpdate,
  handleDelete,
  todos,
  handleComplete,
}) => {
  const todoRef = useRef(null);

  const addTodo = (e) => {
    e.preventDefault();

    const newTodo = todoRef.current.value.trim();
    if (!newTodo) {
      alert("Todo title cannot be empty!");
      return;
    }

    const todo = {
      title: newTodo,
      status: "pending",
    };

    handleAdd(todo);
    todoRef.current.value = "";
  };

  return (
    <div className="flex flex-col p-3 items-center justify-center mx-auto gap-4">
      <form
        className="flex px-9 py-3 rounded-md border-2 gap-3 items-center w-[80%] mx-auto shadow-md shadow-slate-400"
        onSubmit={addTodo}
      >
        <div className="md:w-[80%] w-[78%] flex items-center flex-wrap md:gap-3">
          <label htmlFor="newTodo" className="font-bold">
            Todo Title:
          </label>
          <input
            className="text-black ml-4 rounded-md px-1 h-[35px] w-[70%] md:w-[80%]"
            type="text"
            ref={todoRef}
            placeholder="Enter your todo"
            name="newTodo"
            id="newTodo"
          />
        </div>
        <button className="bg-blue-600 rounded-md px-3 py-1 hover:bg-blue-300">
          Add Todo
        </button>
      </form>

      <div className="my-1 border-b-2 border-blue-600 w-full shadow-md shadow-white"></div>

      <TodoList
        todos={todos}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
        isComplete={false}
      />
    </div>
  );
};

export default Todos;
