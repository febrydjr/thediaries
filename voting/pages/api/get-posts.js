import { connectToDatabase } from "../../database/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const database = await connectToDatabase();
      const collection = database.collection("note");

      const posts = await collection.find({}).toArray();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
