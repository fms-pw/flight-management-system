import mongoose from "../database/mongodb.config.js";

const airportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    iataCode: { type: String, required: true, unique: true, uppercase: true, length: 3 },
    icaoCode: { type: String, required: false, unique: true, uppercase: true, length: 4 },

    city: { type: String, required: true },
    country: { type: String, required: true },
    terminals: { type: Number },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Airport = mongoose.model("Airport", airportSchema);
export default Airport;
