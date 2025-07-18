//     • Integration with Stripe or Razorpay
//     • POST /api/payments/checkout – Initiate payment
//     • POST /api/payments/webhook – Handle webhook callbacks
//     • Secure tokenized transaction handling

import express from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import { createPaymentSession, handlePaymentWebhook } from "../controllers/payments.controller.js";

const router = express.Router();

// Authentication middleware applied to all routes below
router.use(authenticateUser);

router.post("/checkout", createPaymentSession);
router.post("/webhook", handlePaymentWebhook);

export default router;
