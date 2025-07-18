import express from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import authorizeUserRoles from "../middlewares/authorizeRole.middleware.js";
import {
  createFlight,
  deleteFlight,
  getAllFlights,
  getFlightById,
  updateFlightById,
} from "../controllers/flights.controller.js";

import { getFlightStatusByCode, updateFlightStatus } from "../controllers/flightStatus.controller.js";

const router = express.Router();

// Authentication applied to all routes below
router.use(authenticateUser);

router.get("/status/:code", getFlightStatusByCode);

// Authorization applied to all routes below
router.use(authorizeUserRoles(["admin"]));

router.put("/:id/status", updateFlightStatus);

router.post("/", createFlight);
router.get("/", getAllFlights);
router.get("/:id", getFlightById);
router.put("/:id", updateFlightById);
router.delete("/:id", deleteFlight);

export default router;
