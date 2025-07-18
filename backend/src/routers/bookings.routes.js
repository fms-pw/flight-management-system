import express from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import authorizeUserRoles from "../middlewares/authorizeRole.middleware.js";
import {
  cancelBooking,
  createBooking,
  getAllBookings,
  getMyBookings,
  rescheduleBooking,
} from "../controllers/bookings.controller.js";

const router = express.Router();

// Authentication middleware applied to all routes below
router.use(authenticateUser);

router.post("/", createBooking);
router.get("/", getMyBookings);
router.put("/:id/cancel", cancelBooking);
router.put("/:id/reschedule", rescheduleBooking);

// Admin middleware applied to all routes below
router.use(authorizeUserRoles(["admin", "manager"]));

router.get("/all", getAllBookings);

export default router;
