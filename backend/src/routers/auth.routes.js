import express from "express";
import { forgotUserPassword, loginUser, logoutUser, resetUserPassword, signupUser } from "../controllers/auth.controllers.js";
import authenticateUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.post("/logout", authenticateUser, logoutUser);

router.post("/forgot-password", forgotUserPassword);
router.post("/reset-password", resetUserPassword);

export default router;
