import express from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import authorizeUserRoles from "../middlewares/authorizeRole.middleware.js";
import { addNewRoutes, getAllRoutes } from "../controllers/flightRoutes.controller.js";

const router = express.Router();

// Public routes No authentication required
router.get("/", getAllRoutes);

// Admin middleware applied to all routes below
router.use(authenticateUser, authorizeUserRoles(["admin"]));

// Protected routes
router.post("/", addNewRoutes);

export default router;
