import express from "express";

import authRoutes from "./routers/auth.routes.js";
import userRoutes from "./routers/users.routes.js";
import flightRoutes from "./routers/flights.routes.js";
import flightRouteRoutes from "./routers/flightRoutes.routes.js";
import scheduleRoutes from "./routers/schedules.routes.js";
import bookingRoutes from "./routers/bookings.routes.js";
// import notifacationRoutes from "../routers/notifications.routes.js";
import paymentRoutes from "./routers/payments.routes.js";

import { fli_compRouters } from "./routers/fli_comp.routes.js";

const router = express.Router();

// Registering API routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/flights", flightRoutes);
router.use("/routes", flightRouteRoutes);
router.use("/schedules", scheduleRoutes);
router.use("/bookings", bookingRoutes);
// router.use("/notifications", notifacationRoutes);
router.use("/payments", paymentRoutes);
router.use("/fli_comp", fli_compRouters);

export default router;
