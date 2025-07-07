import Flight from "../models/flight.model.js";

export async function createFlight(req, res) {
  let { body } = req;
  if (!Array.isArray(body)) {
    body = [body];
  }

  for (const item of body) {
    const { flightNumber, airline, aircraftType, route, Status } = item;
    if (!flightNumber || !airline || !aircraftType || !route || !Status) {
      return res.status(400).json({ success: false, message: "Please provide complete flight details" });
    }
  }

  try {
    const result = await Flight.insertMany(body);
    return res.status(201).json({ success: true, message: "Flights are inserted successfully", data: result });
  } catch (err) {
    console.error(err, "in flights insertion");

    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: "Duplicate flight code" });
    }

    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}

export async function updateFlight(req, res) {
  const flightId = req.params.id;
  const updateData = req.body;

  try {
    const flight = await Flight.findByIdAndUpdate(flightId, updateData, {
      new: true,
      runValidators: true, //this makes the new changes to abide by our schema
    });
    if (!flight) {
      return res.status(404).json({ success: false, message: "Flight not found" });
    }
    res.status(200).json({ success: true, message: "Flight updated", data: flight });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}

export async function deleteFlight(req, res) {
  const flightId = req.params.id;

  try {
    const flight = await Flight.findByIdAndDelete(flightId); //
    if (!flight) {
      return res.status(404).json({ success: false, message: "Flight not found" });
    }
    res.status(200).json({ success: true, message: "Flight deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}

export async function getFlightById(req, res) {
  const flightId = req.params.id;

  try {
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ success: false, message: "Flight not found" });
    }
    res.status(200).json({ success: true, message: "Flight fetched", data: flight });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}

export async function getAllFlights(req, res) {
  try {
    const flights = await Flight.find({});
    return res.status(200).json({ success: true, message: "Flights fetched", data: flights });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}
