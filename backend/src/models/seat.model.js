import mongoose from "mongoose";
let seatSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    Class: {
      type: String,
      enum: ["Economy", "Business", "First"],
      default: "Economy",
    },
     seatType: {
      type: String,
      enum: ["window", "middle", "aisle"],
      required: true,
    },
  },
  { timestamps: true }
);
let Seat=mongoose.model("Seat",seatSchema);
export default Seat;