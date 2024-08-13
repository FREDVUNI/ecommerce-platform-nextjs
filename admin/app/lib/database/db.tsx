import mongoose from "mongoose";

let isConnected: boolean = false;

const connectDB = async (): Promise<void> => {
  if (isConnected) return console.log("Already connected.");

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.log("MONGO_URI is not defined in the environment variables.");
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGO_DB_NAME,
    });
    isConnected = true;
    console.log("Database connected.");
  } catch (error) {
    console.log("Error connecting to the database:", error);
    isConnected = false;
  }
};

export default connectDB;
