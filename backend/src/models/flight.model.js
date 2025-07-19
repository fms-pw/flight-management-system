import mongoose from "../database/mongodb.config.js";

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true, unique: true, trim: true },
    airline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airline",
      required: true,
    },
    departureAirport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true,
    },
    arrivalAirport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true,
    },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    seats: [
      {
        seatNumber: {
          type: String,
          required: true,
          unique: true,
        },
        seatType: {
          type: String,
          enum: ["Economy", "Premium Economy", "Business", "First Class"],
          required: true,
          trim: true,
        },
        totalSeats: {
          type: Number,
          required: true,
        },
        availableSeats: {
          type: Number,
          required: true,
        },
        seatPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["Scheduled", "Delayed", "Cancelled", "Boarding", "Departed", "Landed"],
      default: "Scheduled",
      trim: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Flight = mongoose.model("Flight", flightSchema);
export default Flight;
