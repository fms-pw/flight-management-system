import mongoose from 'mongoose';
const airportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true }, // e.g., DEL, BOM
  city: { type: String, required: true },
  country: { type: String, required: true },
}, { timestamps: true });

export const Airport = mongoose.model('Airport', airportSchema);
