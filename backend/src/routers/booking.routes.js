import express from "express";
import {
  createBooking,
  confirmPayment,
  manualConfirmPayment,
  checkFlightAvailability,
  getUserBookings,
  getBookingDetails,
  cancelBooking,
  rescheduleBooking,
  getAllBookings, // if needed for admin
} from "../controllers/booking.controller.js";

import authenticateUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/book", authenticateUser, createBooking);

router.get("/availability", checkFlightAvailability);


router.post("/payment/confirm", authenticateUser, confirmPayment);
router.post("/payment/manual-confirm", authenticateUser, manualConfirmPayment);
router.get("/my-bookings", authenticateUser, getUserBookings);r
router.get("/my-bookings/:bookingId", authenticateUser, getBookingDetails);
router.patch("/cancel/:bookingId", authenticateUser, cancelBooking);
router.patch("/reschedule/:id", authenticateUser, rescheduleBooking);

router.get("/admin/all", getAllBookings); // You can protect this with admin middleware

export default router;
