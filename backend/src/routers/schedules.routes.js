import express from "express";

import authenticateUser from "../middlewares/auth.middleware.js";
import authorizeUserRoles from "../middlewares/authorizeRole.middleware.js";

import { setScheduleForFlights } from "../controllers/schedules.controller.js";

const router = express.Router();

// Public routes No authentication required

// Authentication middleware applied to all routes below
router.use(authenticateUser, authorizeUserRoles(["admin"]));

// Protected routes
router.post("/", setScheduleForFlights);

export default router;
