import { MongoClient } from "mongodb";

const addTodo = async (req, res) => {
  if (req.method === "POST") {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://abhicodeworld:abhicodeworld@cluster0.dumr2.mongodb.net/next-todo?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      const db = client.db();

      const todoCollection = db.collection("todos");

      const result = await todoCollection.insertOne(req.body);

      await client.close();

      res
        .status(200)
        .json({ message: "Todo Added", todoId: result.insertedId });
    } catch (error) {
      console.error("Error adding todo:", error);
      res
        .status(500)
        .json({ message: "Failed to add todo", error: error.message });
    }
  }
};

export default addTodo;
