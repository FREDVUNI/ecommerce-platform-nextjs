import mongoose from "mongoose";

let isConnected: boolean = false;

const connectDB = async (): Promise<void> => {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;
  if (!uri) return;

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGO_DB_NAME,
    });
    isConnected = true;
  } catch (error) {
    isConnected = false;
    return;
  }
};

export default connectDB;
