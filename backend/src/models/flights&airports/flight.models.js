import mongoose from "mongoose";

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true, unique: true },
    airline: { type: String, required: true },
    aircraftType: { type: String },
    timing: { type: mongoose.Schema.Types.ObjectId, ref: "Schedule", required: true },
    seats: [
      {
        number: { type: String, required: true ,unique:true},
        class: {
          type: String,
          enum: ["Economy", "Business", "First"],
          default: "Economy",
        },
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
export let Flight = mongoose.model("Flight", flightSchema);
