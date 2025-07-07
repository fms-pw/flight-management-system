import express from "express";
import cookieParser from "cookie-parser";

import { establishDBConnection } from "./database/mongodb.config.js";

import authRoutes from "./routers/auth.routes.js";
import userRoutes from "./routers/user.routes.js";
const bookingRoutes = require('./routers/booking.routes.js');
import { flightsRouter } from "./routers/flights.routes.js";
import { fli_compRouters } from "./routers/fli_comp.routes.js";
import cookieParser from "cookie-parser";

import authenticateUser from "./middlewares/auth.middleware.js";

const server = express();
server.use(express.json());

server.use(cookieParser()); 
server.use(express.json({ limit: "16kb" }));
server.use(cookieParser());

server.get("/", (req, res) => {
  return res.status(200).json({ message: "Flight Management System" });
});

// Test authenticate middleware using ping route
server.get("/ping", authenticateUser, (req, res) => {
  return res.status(200).json({
    success: true,
    message: `Ping Pong Ping ! ${req.user?.email} You are Authenticated and working fine.`,
  });
});

server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/users", userRoutes);
server.use("/api/bookings", bookingRoutes);
server.use("/api/v1/flights", flightsRouter);
server.use("/api/v1/fli_comp", fli_compRouters);

// Handle undefined routes with a 404 Not Found response
server.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

res.cookie("jwtAuthToken", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});

// Function to start the server after a successful database connection
const startServer = async () => {
  try {
    // Connect to the database before starting the server
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
