import mongoose from "mongoose";
const routeSchema = new mongoose.Schema(
  {
    origin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airport",
      required: true,
    },
    routeCode: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
    },

    distance: {
      type: Number, // in km
      default: 0,
    },

    duration: {
      type: String, // e.g., "2h 15m"
      default: "0h 0m",
    },
  },
  {
    timestamps: true,
  }
);
const FlightRoute = mongoose.model('FlightRoute', routeSchema);
export default FlightRoute;