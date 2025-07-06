import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import Flight from "../models/flight.model.js";
import User from "../models/route.model.js";
import { sendEmail } from "../utils/emailService.js";
import { createPaymentIntent } from "../utils/stripe.js";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("flight user").sort({ bookingDate: -1 });

    return res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Admin fetch bookings error:", error);
    return res.status(500).json({ message: "Error fetching all bookings" });
  }
};

// Create Booking and initiate payment
export const createBooking = async (req, res) => {
  try {
    const { flightId, passengers, userId } = req.body;
    console.log(req.body);

    const flight = await Flight.findById(flightId);
    const user = await User.findById(userId);

    if (!flight || !user) {
      return res.status(404).json({ message: !flight ? "Flight not found" : "User not found" });
    }

    if (flight.availableSeats < passengers.length) {
      return res.status(400).json({
        message: "Not enough seats available",
        availableSeats: flight.availableSeats,
        requestedSeats: passengers.length,
      });
    }

    const totalAmount = flight.price * passengers.length;

    const paymentIntent = await createPaymentIntent(totalAmount);

    const booking = new Booking({
      flight: flightId,
      user: userId,
      passengers,
      totalAmount,
      status: "pending",
      paymentIntentId: paymentIntent.id,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 mins expiry
    });

    await booking.save();

    return res.status(201).json({
      message: "Booking created, pending payment",
      bookingId: booking._id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    return res.status(500).json({ message: "Server error during booking creation" });
  }
};

export const confirmPayment = async (req, res) => {
  const { bookingId, paymentIntentId } = req.body;
  console.log(req.body);

  try {
    const booking = await Booking.findById(bookingId).populate("flight user");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      if (booking.status !== "confirmed") {
        booking.status = "confirmed";
        await booking.save();

        const updatedFlight = await Flight.findOneAndUpdate(
          {
            _id: booking.flight._id,
            availableSeats: { $gte: booking.passengers.length },
          },
          {
            $inc: { availableSeats: -booking.passengers.length },
          },
          { new: true }
        );

        if (!updatedFlight) {
          booking.status = "cancelled";
          await booking.save();
          return res.status(400).json({ message: "Not enough seats available" });
        }

        await sendEmail(booking.user.email, "bookingConfirmation", {
          username: booking.user.name,
          flightNumber: booking.flight.flightNumber,
          passengers: booking.passengers,
          departureDate: booking.flight.departureDate,
          totalAmount: booking.totalAmount,
        });
      }

      return res.status(200).json({ message: "Payment confirmed", booking });
    } else {
      return res.status(400).json({ message: `Payment status: ${paymentIntent.status}` });
    }
  } catch (error) {
    console.error("Payment confirmation error:", error);
    return res.status(500).json({ message: "Error confirming payment" });
  }
};

export const manualConfirmPayment = async (req, res) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "confirmed";
    await booking.save();

    return res.status(200).json({ message: "Manually confirmed", booking });
  } catch (error) {
    console.error("Manual payment error:", error);
    return res.status(500).json({ message: "Error manually confirming payment" });
  }
};

export const checkFlightAvailability = async (req, res) => {
  try {
    const { flightId, numberOfSeats = 1 } = req.query;
    const flight = await Flight.findById(flightId);

    if (!flight) return res.status(404).json({ message: "Flight not found" });

    const isAvailable = flight.availableSeats >= numberOfSeats;

    return res.status(200).json({
      available: isAvailable,
      flight: {
        flightNumber: flight.flightNumber,
        departure: flight.departure,
        arrival: flight.arrival,
        departureDate: flight.departureDate,
        availableSeats: flight.availableSeats,
        requestedSeats: numberOfSeats,
        price: flight.price,
        totalPrice: flight.price * numberOfSeats,
      },
    });
  } catch (error) {
    console.error("Availability error:", error);
    return res.status(500).json({ message: "Availability check failed" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ user: userId }).populate("flight").sort({ bookingDate: -1 });

    return res.status(200).json({
      count: bookings.length,
      bookings: bookings.map((b) => ({
        id: b._id,
        flightDetails: {
          flightNumber: b.flight.flightNumber,
          departure: b.flight.departure,
          arrival: b.flight.arrival,
          departureDate: b.flight.departureDate,
          arrivalDate: b.flight.arrivalDate,
        },
        passengers: b.passengers,
        totalAmount: b.totalAmount,
        status: b.status,
        bookingDate: b.bookingDate,
      })),
    });
  } catch (error) {
    console.error("Fetch user bookings error:", error);
    return res.status(500).json({ message: "Error fetching bookings" });
  }
};

export const getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({ _id: bookingId, user: userId }).populate("flight");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    return res.status(200).json({
      id: booking._id,
      flightDetails: {
        flightNumber: booking.flight.flightNumber,
        departure: booking.flight.departure,
        arrival: booking.flight.arrival,
        departureDate: booking.flight.departureDate,
        arrivalDate: booking.flight.arrivalDate,
      },
      passengers: booking.passengers,
      totalAmount: booking.totalAmount,
      status: booking.status,
      bookingDate: booking.bookingDate,
    });
  } catch (error) {
    console.error("Fetch booking details error:", error);
    return res.status(500).json({ message: "Error fetching booking details" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({ _id: bookingId, user: userId, status: { $ne: "cancelled" } }).populate("flight user");

    if (!booking) return res.status(404).json({ message: "Booking not found or already cancelled" });

    if (new Date(booking.flight.departureDate) < new Date()) {
      return res.status(400).json({ message: "Cannot cancel after flight departure" });
    }

    booking.status = "cancelled";
    await booking.save();

    await Flight.findByIdAndUpdate(booking.flight._id, {
      $inc: { availableSeats: booking.passengers.length },
    });

    await sendEmail(booking.user.email, "bookingCancellation", {
      booking,
      flight: booking.flight,
    });

    return res.status(200).json({
      message: "Booking cancelled",
      booking: {
        id: booking._id,
        status: booking.status,
        refundAmount: booking.totalAmount,
      },
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    return res.status(500).json({ message: "Error cancelling booking" });
  }
};

export const rescheduleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { newFlightId } = req.body;
    const userId = req.user.id;

    const booking = await Booking.findOne({ _id: id, user: userId }).populate("flight");
    const newFlight = await Flight.findById(newFlightId);

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (!newFlight) return res.status(404).json({ message: "New flight not found" });

    if (new Date(booking.flight.departureDate) < new Date()) {
      return res.status(400).json({ message: "Cannot reschedule past bookings" });
    }

    if (newFlight.availableSeats < booking.passengers.length) {
      return res.status(400).json({ message: "Not enough seats on the new flight" });
    }

    await Flight.findByIdAndUpdate(booking.flight._id, {
      $inc: { availableSeats: booking.passengers.length },
    });

    await Flight.findByIdAndUpdate(newFlight._id, {
      $inc: { availableSeats: -booking.passengers.length },
    });

    booking.flight = newFlightId;
    booking.status = "rescheduled";
    await booking.save();

    return res.status(200).json({ message: "Booking rescheduled", booking });
  } catch (error) {
    console.error("Reschedule booking error:", error);
    return res.status(500).json({ message: "Error rescheduling booking" });
  }
};
