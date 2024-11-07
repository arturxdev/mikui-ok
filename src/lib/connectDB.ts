// Importing mongoose library along with Connection type from it
import mongoose, { Connection } from "mongoose";

// Declaring a variable to store the cached database connection
let cachedConnection: Connection | null = null;

// Function to establish a connection to MongoDB
export async function connectDB() {
  // If a cached connection exists, return it
  const DATABASE_URL = process.env.DATABASE_URL;

  
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }
  try {
    if (!DATABASE_URL) {
      throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
    }
    // If no cached connection exists, establish a new connection to MongoDB
    const cnx = await mongoose.connect(DATABASE_URL);
    // Cache the connection for future use
    cachedConnection = cnx.connection;
    // Log message indicating a new MongoDB connection is established
    console.log("New mongodb connection established");
    // Return the newly established connection
    return cachedConnection;
  } catch (error) {
    // If an error occurs during connection, log the error and throw it
    console.log(error);
    throw error;
  }
}
export default connectDB;