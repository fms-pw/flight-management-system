import Flight from "../models/flight.model.js";
import { sendStatusEmailNotification } from "../utils/notification.utils.js";

export const updateFlightStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, userEmail } = req.body;

    const validStatuses = ["scheduled", "delayed", "cancelled", "departed", "landed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const flight = await Flight.findByIdAndUpdate(id, { Status: status }, { new: true });

    if (!flight) {
      return res.status(404).json({ message: "Flight not found." });
    }

    // Send Email Notification
    if (userEmail) {
      await sendStatusEmailNotification(userEmail, flight);
    }

    res.status(200).json({
      message: "Flight status updated successfully & notification sent.",
      flight,
    });
  } catch (err) {
    console.error("Update Status Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFlightStatusByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const flight = await Flight.findOne({ flightNumber: code.toUpperCase() });

    if (!flight) {
      return res.status(404).json({ message: "Flight not found." });
    }

    res.status(200).json({
      message: "Flight status retrieved successfully.",
      status: flight.Status,
      flightNumber: flight.flightNumber,
      airline: flight.airline,
    });
  } catch (err) {
    console.error("Get Status Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
