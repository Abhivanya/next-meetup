import { MongoClient } from "mongodb";

const addTodo = async (req, res) => {
  if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://abhicodeworld:abhicodeworld@cluster0.dumr2.mongodb.net/next-todo?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      const db = client.db();

      const todoCollection = db.collection("todos");

      const result = await todoCollection.find().toArray();

      await client.close();

      res.status(200).json(result);
    } catch (error) {
      console.error("Error Load todo:", error);
      res
        .status(500)
        .json({ message: "Failed to load todo", error: error.message });
    }
  }
};

export default addTodo;
