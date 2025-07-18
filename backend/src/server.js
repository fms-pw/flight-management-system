import express from "express";
import cookieParser from "cookie-parser";
import apiRouter from "./routes.js";
import { establishDBConnection } from "./database/mongodb.config.js";
import notFoundHandler from "./middlewares/notFoundHandler.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

export const server = express();

server.use(express.json({ limit: "16kb" }));

server.use(cookieParser());

// Mount all API routes under /api/v1
server.use("/api/v1", apiRouter);

// Handle 404 - Route not found
server.use(notFoundHandler);

// Global error handler
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
