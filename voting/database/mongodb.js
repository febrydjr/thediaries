import { MongoClient } from "mongodb";
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db("diary");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

const closeDatabase = async () => {
  try {
    await client.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  }
};

export { connectToDatabase, closeDatabase };
