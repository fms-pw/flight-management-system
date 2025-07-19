import mongoose from "../database/mongodb.config.js";

const airlineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },

    iataCode: { type: String, required: true, unique: true, uppercase: true, length: 2, trim: true },
    icaoCode: { type: String, unique: true, uppercase: true, length: 3, trim: true },

    country: { type: String, required: true, trim: true },
    logoUrl: { type: String },

    contact: {
      phone: { type: String, trim: true },
      website: { type: String },
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Airline = mongoose.model("Airline", airlineSchema);
export default Airline;
