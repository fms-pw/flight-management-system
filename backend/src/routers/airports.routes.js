import express from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import authorizeUserRoles from "../middlewares/authorizeRole.middleware.js";
import {
    addNewAirport,
    deleteAirport,
    getAirportById,
    getAllAirports,
    updateAirportById,
} from "../controllers/airports.controller.js";

const router = express.Router();

router.use(authenticateUser, authorizeUserRoles(["admin"]));

router.post("/", addNewAirport);
router.get("/", getAllAirports);
router.get("/:id", getAirportById);
router.put("/:id", updateAirportById);
router.delete("/:id", deleteAirport);

export default router;
