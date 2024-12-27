import { MongoClient } from "mongodb";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://abhicodeworld:abhicodeworld@cluster0.mnr2x.mongodb.net/?retryWrites=true&w=majority&appName=meetups"
    );
    const db = client.db(); // hold the databse meetup (if exists otherwise create)

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(200).json({ message: "meetup added Successfully" });
  }
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://abhicodeworld:abhicodeworld@cluster0.mnr2x.mongodb.net/?retryWrites=true&w=majority&appName=meetups"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.find().toArray();
    const formatedData = result.map((item) => ({
      id: item._id.toString(),
      title: item.title,
      address: item.address,
      image: item.image,
    }));
    res.json(formatedData);
  }
};

export default handler;
