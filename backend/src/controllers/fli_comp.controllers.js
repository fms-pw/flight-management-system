import Airport from "../models/airport.model.js";
import FlightRoute from "../models/route.model.js";
import Schedule from "../models/schedule.model.js";
import Seat from "../models/seat.model.js";
//all controller support bulk entries as below data mostly would be entered in bulk

export async function createAirport(req, res) {
  const data = req.body;

  const airports = Array.isArray(data) ? data : [data];
  if (airports.some(({ name, code, city, country }) => !name || !code || !city || !country)) {
    return res.status(400).json({ message: "Please provide complete airport data." });
  }

  try {
    const result = await Airport.insertMany(airports);
    return res.status(201).json({ message: "Airports inserted successfully", data: result });
  } catch (err) {
    console.error(err, "in airport creation");

    if (err.code === 11000) {
      return res.status(409).json({ message: "Duplicate airport code" });
    }

    return res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function createSchedule(req, res) {
  const data = req.body;

  const schedules = Array.isArray(data) ? data : [data];
  if (schedules.some(({ flightId, routeId, departureTime, arrivalTime, duration, isRecurring,recurrencePattern }) => !flightId|| !routeId || !departureTime || !arrivalTime || !duration|| !isRecurring|| !recurrencePattern)) {
    return res.status(400).json({ message: "Please provide complete schedule data." });
  }

  try {
    const result = await Schedule.insertMany(schedules);
    return res.status(201).json({ message: "Schedules created successfully", data: result });
  } catch (err) {
    console.error(err, "in schedule creation");
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
export async function createRoute(req, res) {
  const data = req.body;

  const routes = Array.isArray(data) ? data : [data];
  if (routes.some(({ origin, destination,  routeCode, duration, distance }) => !origin|| !destination ||  !routeCode || !duration || !distance)) {
    return res.status(400).json({ message: "Please provide complete route data." });
  }

  try {
    const result = await FlightRoute.insertMany(routes);
    return res.status(201).json({ message: "routes created successfully", data: result });
  } catch (err) {
    console.error(err, "in route creation");
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
export async function createSeat(req, res) {
  const data = req.body;

  const seats = Array.isArray(data) ? data : [data];
  if (seats.some(({ number, Class,  seatType }) => !number || !Class || !seatType)) {
    return res.status(400).json({ message: "Please provide complete seat data." });
  }

  try {
    const result = await Seat.insertMany(seats);
    return res.status(201).json({ message: "seats created successfully", data: result });
  } catch (err) {
    console.error(err, "in seat creation");
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}
