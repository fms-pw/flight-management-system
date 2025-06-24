import express from "express";

import { establishDBConnection } from "./database/mongodb.config.js";
import authRoutes from "./routers/auth.routes.js";
import { flightsRouter } from "./routers/flights.routes.js";
import { fli_compRouters } from "./routers/fli_comp.routes.js";
import userRoutes from "./routers/user.routes.js";

const server = express();
server.get("/",(req,res)=>{
  return res.status(200).json({"message":"Flight Booking Simulator"})
})
server.use(express.json({ limit: "16kb" }));

server.use("/api/v1/auth", authRoutes);

const startServer = async () => {
  try {
    // Establish a connection to the database
    const isDBConnected = await establishDBConnection();

    if (!isDBConnected) {
      console.error("\nDatabase connection failed. Aborting server startup\n");
      process.exit(1); // Exit the process if the database connection fails
    }

    const port = process.env.PORT || 7000;

    // Start the server and listen on the specified port
    server.listen(port, () => {
      console.info(`\nServer is start running at http://127.0.0.1:${port}\n`);
    });
  } catch (err) {
    console.log("\nServer Startup Failure\n", err);
    console.info("\nShutting down system\n");
    process.exit(1); // Exit the process with an error code
  }
};
export default startServer;
