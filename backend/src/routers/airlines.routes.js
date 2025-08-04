import express from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import authorizeUserRoles from "../middlewares/authorizeRole.middleware.js";
import {
    addNewAirline,
    deleteAirline,
    getAirlineById,
    getAllAirlines,
    updateAirlineById,
} from "../controllers/airlines.controller.js";

const router = express.Router();

router.use(authenticateUser, authorizeUserRoles(["admin"]));

router.post("/", addNewAirline);
router.get("/", getAllAirlines);
router.get("/:id", getAirlineById);
router.put("/:id", updateAirlineById);
router.delete("/:id", deleteAirline);

export default router;
