import { MongoClient, ObjectId } from "mongodb";

const deleteTodoHnadler = async (req, res) => {
  if (req.method === "PATCH") {
    try {
      const { todoId } = req.query;
      const client = await MongoClient.connect(
        "mongodb+srv://abhicodeworld:abhicodeworld@cluster0.dumr2.mongodb.net/next-todo?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      const db = client.db();

      const todoCollection = db.collection("todos");

      const result = await todoCollection.updateOne(
        { _id: new ObjectId(todoId) },
        { $set: { status: "complete" } }
      );
      res.status(200).json({ message: "todo Completed" });
    } catch (error) {
      console.log(error);
    }
  }
};

export default deleteTodoHnadler;
