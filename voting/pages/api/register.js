import { connectToDatabase, closeDatabase } from "../../database/mongodb";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { credentials, name } = req.body;
      const database = await connectToDatabase();
      const collection = database.collection("credentials");

      const storedCredentials = await collection.distinct("credentials");

      const isDuplicate = storedCredentials.some((storedCredential) =>
        bcrypt.compareSync(credentials, storedCredential)
      );

      if (isDuplicate) {
        return res.status(400).json({ message: "Credential already exists!" });
      }

      const hashedCredential = await bcrypt.hash(credentials, 10);

      await collection.insertOne({
        name,
        credentials: hashedCredential,
      });

      return res.status(200).json({ message: "Registered!" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong!" });
    } finally {
      await closeDatabase();
    }
  } else {
    return res.status(405).json({ message: "Method not allowed!" });
  }
}
