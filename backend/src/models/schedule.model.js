import mongoose from "mongoose";

const timingSchema = new mongoose.Schema(
  {
    flightId_A: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    flightId_B: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FlightRoute",
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    duration: {
      type: String, // Optional
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    days:{ 
      type:String,
      enum: ["Mon","Tue", "Wed","Thur", "Fri","Sat","Sun","Daily"],
      default:"Daily"
      }
  },
  { timestamps: true }
);

 const Schedule = mongoose.model("Schedule", timingSchema);
 export default Schedule;
