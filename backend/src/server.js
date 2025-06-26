import express from "express";
import cookieParser from "cookie-parser";

import { establishDBConnection } from "./database/mongodb.config.js";

import authRoutes from "./routers/auth.routes.js";
import userRoutes from "./routers/user.routes.js";

import authenticateUser from "./middlewares/auth.middleware.js";

const server = express();

// Parse incoming JSON requests and cookies with specified limits
server.use(express.json({ limit: "16kb" }));
server.use(cookieParser());

// Test route to verify authentication middleware
server.get("/ping", authenticateUser, (req, res) => {
  return res.status(200).json({
    success: true,
    message: `Ping Pong Ping ! ${req.user?.email} You are Authenticated and working fine.`,
  });
});

// Register authentication and user-related API routes
server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/users", userRoutes);

// Handle undefined routes with a 404 Not Found response
server.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Function to start the server after establishing a database connection
const startServer = async () => {
  try {
    // Attempt to connect to the database before starting the server
    const isDBConnected = await establishDBConnection();

    if (!isDBConnected) {
      console.error("\nDatabase connection failed. Aborting server startup\n");
      process.exit(1); // Exit if DB connection fails
    }

    const port = process.env.PORT || 7000;

    // Start listening for incoming requests on the specified port
    server.listen(port, () => {
      console.info(`\nServer is start running at http://localhost:${port}\n`);
    });
  } catch (err) {
    console.log("\nServer Startup Failure\n", err);
    console.info("\nShutting down system\n");
    process.exit(1); // Exit the process with an error code
  }
};

export default startServer;
