import { connectToDatabase, closeDatabase } from "../../database/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  function generateToken(session) {
    try {
      return jwt.sign(session, "jwtkey", { expiresIn: "12h" });
    } catch (error) {
      throw new Error("Error generating token");
    }
  }

  if (req.method === "POST") {
    try {
      const { credentials } = req.body;
      const database = await connectToDatabase();
      const collection = database.collection("credentials");

      const storedCredential = await collection.findOne({ credentials });

      if (!storedCredential) {
        res.status(400).json({ message: "No credentials found" });
        return;
      }

      const payload = {
        name: storedCredential.name,
        // credentials: storedCredential.credentials,
      };

      console.log(payload);

      const token = generateToken(payload);

      if (credentials === storedCredential.credentials) {
        res.status(200).json({
          message: "Login success",
          token,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!" });
      console.log(error);
    } finally {
      await closeDatabase();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
