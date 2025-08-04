import mongoose from "../database/mongodb.config.js";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    seatType: {
      type: String,
      enum: ["Economy", "Premium Economy", "Business", "First Class"],
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
    },
    amount: { type: Number, required: true },
    bookingStatus: {
      type: String,
      enum: ["Confirmed", "Pending", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
