import { useEffect, useState } from "react";
import Todos from "../components/Todos";
import { MongoClient } from "mongodb";

const HomePage = (props) => {
  const [todos, setTodos] = useState(props.todos);
  const [refetch, setRefetch] = useState(false);

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

    if (refetch) {
      fetchTodos();
      setRefetch(false);
    }
  }, [refetch]);
  const addTodo = async (todo) => {
    try {
      const response = await fetch("/api/add-todo", {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res) {
        alert("Todo added successfully");
        setRefetch(true);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (todoId, updatedTodo) => {
    try {
      const response = await fetch(`/api/update-todo/${todoId}`, {
        method: "PATCH",
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (res) {
        alert("Todo updated successfully");
        setRefetch(true);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const response = await fetch(`/api/delete-todo/${todoId}`, {
        method: "DELETE",
      });
      const res = await response.json();
      if (res) {
        alert("Todo deleted successfully");
        setRefetch(true);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
      <Todos
        todos={todos}
        handleAdd={addTodo}
        handleUpdate={updateTodo}
        handleDelete={deleteTodo}
      />
    </>
  );
};

export async function getServerSideProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://abhicodeworld:abhicodeworld@cluster0.dumr2.mongodb.net/next-todo?retryWrites=true&w=majority"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");

  const todos = await todosCollection.find().toArray();

  await client.close();

  const formattedTodos = todos.map((todo) => ({
    id: todo._id.toString(),
    title: todo.title,
    status: todo.status,
  }));

  return {
    props: {
      todos: formattedTodos,
    },
  };
}

export default HomePage;
