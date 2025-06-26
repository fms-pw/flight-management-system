import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true, unique: true },
    airline: { type: String, required: true },
    aircraftType: { type: String },
    route: { type: mongoose.Schema.Types.ObjectId, ref: "FlightRoute", required: true },
    seats: [
      {
       type:mongoose.Schema.Types.ObjectId,ref:"Seat"
      },
    ],

    Status: {
      type: String,
      enum: ["scheduled", "delayed", "cancelled", "departed", "landed"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);
 let Flight = mongoose.model("Flight", flightSchema);
 export default Flight;
