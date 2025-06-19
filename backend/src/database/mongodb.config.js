// backend/src/database/mongodb.config.js

import mongoose from "mongoose";

// Function to establish connection with MongoDB database
const establishDBConnection = async () => {
  try {
    // Construct MongoDB URI using environment variables
    const { MONGODB_URI, DB_NAME, MONGODB_URI_OPTIONS } = process.env;

    // Validate required environment variables
    if (!MONGODB_URI || !DB_NAME || !MONGODB_URI_OPTIONS) {
      throw new Error("Missing MONGODB_URI or DB_NAME or MONGODB_URI_OPTIONS in environment variables.");
    }
    // Attempt to connect to MongoDB
    const mongoDBconnection = await mongoose.connect(MONGODB_URI + DB_NAME + MONGODB_URI_OPTIONS);

    // Log successful connection details
    console.info(`\nMongoDB Connected Successfully:
      Host Name : ${mongoDBconnection.connection.host}
      Database Name : ${mongoDBconnection.connection.name}
      Connection String : ${mongoDBconnection.connection._connectionString}`);

    return true; // Return true if connection is successful
  } catch (error) {
    // Log error details if connection fails
    console.error(`\nMongoDB Connection Failed!
            ${error.name}
            ${error.message}\n`);
    return false; // Return false if connection fails
  }
};

export default establishDBConnection;
