import express from 'express';
import { createAirport,createRoute,createSchedule } from '../controllers/fli_comp.controllers.js';
export const fli_compRouters=express.Router();
fli_compRouters.post("/createAirport",createAirport);
fli_compRouters.post("/createSchedule",createSchedule);
fli_compRouters.post("/createRoute",createRoute);
