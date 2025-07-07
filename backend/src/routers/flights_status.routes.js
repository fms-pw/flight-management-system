import express from "express";
import { getFlightStatusByCode, updateFlightStatus } from "../controllers/flights_status.controller.js";


export const fli_statusRouter = express.Router();

fli_statusRouter.put("/:id/status", updateFlightStatus);
fli_statusRouter.get("/status/:code", getFlightStatusByCode);
