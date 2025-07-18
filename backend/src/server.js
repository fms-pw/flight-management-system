import express from "express";
import cookieParser from "cookie-parser";

import apiRouter from "./api/routes.js";
import errorHandler from "./middlewares/error.middleware.js";

import { establishDBConnection } from "./database/mongodb.config.js";

export const server = express();

// Parse JSON payloads up to 16kb
server.use(express.json({ limit: "16kb" }));

// Parse cookies on incoming requests
server.use(cookieParser());

// Mount organized API routes at /api/v1
server.use("/api/v1", apiRouter);

// Handle undefined routes with a 404 response
server.use((req, res) => {
  res.status(404).json({ success: false, message: "404 Route Not Found" });
});

// Global error handler middleware
server.use(errorHandler);

// Start server only after database connection is established
const startServer = async () => {
  try {
    // Establish MongoDB connection
    const isDBConnected = await establishDBConnection();

    if (!isDBConnected) {
      console.error("\nDatabase connection failed. Aborting server startup\n");
      process.exit(1);
    }

    const port = process.env.PORT || 7000;

    // Start the server and listen for incoming requests
    server.listen(port, () => {
      console.info(`\nServer is start running at http://localhost:${port}\n`);
    });
  } catch (err) {
    console.log("\nServer Startup Failure, Shutting down system\n", err);
    process.exit(1);
  }
};

export default startServer;
