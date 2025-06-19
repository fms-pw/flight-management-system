import express from "express";
import {
  getAllFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight,
} from "../controllers/flights.controllers.js";

export let flightsRouter=express.Router();
flightsRouter.post("/createFlight",createFlight);
flightsRouter.put("/updateFlight",updateFlight);
flightsRouter.delete("/deleteFlight/:id",deleteFlight);
flightsRouter.get("getAFlight/:id",getFlightById);
flightsRouter.get("getAllFlights",getAllFlights); //admin middleware must be added here

