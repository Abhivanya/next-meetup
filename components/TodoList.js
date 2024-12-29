const TodoList = ({ todos, handleUpdate, handleDelete, handleComplete }) => {
  if (!todos || todos.length === 0)
    return <p className="text-center text-gray-500">No todos yet. Add one!</p>;

  return (
    <div className="w-[80%] mx-auto flex border-2 rounded-md p-4 flex-col gap-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex justify-between items-center w-full px-3 gap-3 bg-slate-100 text-gray-700 p-4 rounded-md shadow-md shadow-gray-500"
        >
          <div
            className={`font-bold w-[75%] ${
              todo.status === "done" ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </div>

          <div className="flex items-center gap-2 w-[250px]">
            <button
              className="px-2 bg-green-600 py-1 rounded-md text-white font-bold"
              onClick={() => handleComplete(todo.id)}
            >
              Done
            </button>
            <button
              className="px-2 bg-red-600 py-1 rounded-md text-white font-bold"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
            <button
              className="px-2 bg-yellow-300 py-1 rounded-md text-gray-800 font-bold"
              onClick={() => handleUpdate(todo.id)}
            >
              Update
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
