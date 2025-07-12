import express from "express";
import cookieParser from "cookie-parser";

import { establishDBConnection } from "./database/mongodb.config.js";

import authRoutes from "./routers/auth.routes.js";
import userRoutes from "./routers/user.routes.js";

import { flightsRouter } from "./routers/flights.routes.js";
import { fli_compRouters } from "./routers/fli_comp.routes.js";
import { fli_statusRouter } from "./routers/flights_status.routes.js";

// Import error handling middleware
import errorHandler from "./middlewares/errorHandler.middleware.js";

const server = express();

// Parsing incoming JSON requests and cookies
server.use(express.json({ limit: "32kb" }));
server.use(cookieParser());

server.get("/", (req, res) => res.status(200).json({ status: "success", message: "OK" }));

// Registering API routes
server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/users", userRoutes);

server.use("/api/v1/flights", flightsRouter);
server.use("/api/v1/fli_comp", fli_compRouters);
server.use("/api/v1/fli_status", fli_statusRouter);

// Handle undefined routes with a 404 response
server.use((req, res) => {
  res.status(404).json({ success: false, message: "404 Route Not Found" });
});

// Global error handler middleware
server.use(errorHandler);

// Function to start the server after establishing a database connection
const startServer = async () => {
  try {
    // Connecting to the database before starting the server
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
