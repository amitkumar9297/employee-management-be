import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/**
 * Initializes a connection to the MongoDB database using the URI
 * specified in the environment variables. Returns a promise that 
 * resolves to true if the connection is successful, or throws an 
 * error if the MongoDB URI is not found or the connection fails.
 *
 * @returns {Promise<boolean>} A promise that resolves to true if 
 * the connection to the database is successful.
 * @throws Will throw an error if the MongoDB URI is not specified 
 * in the environment variables or if the connection attempt fails.
 */

export const initDB = async (): Promise<boolean> => {
  try {
    
    const mongodbUri = process.env.MONGODB_URI ?? "mongodb+srv://admin:75way123@cluster0.o8or1.mongodb.net/empmanagement";
  

    if (!mongodbUri) {
      console.error("MongoDB URI not found in environment variables.");
      return false;
    }

    mongoose.set("strictQuery", false);

    await mongoose.connect(mongodbUri);
    console.log("DB Connected!");
    return true;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return false;
  }
};