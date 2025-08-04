import mongoose from "../database/mongodb.config.js";

const airportSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },

        iataCode: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            minlength: 3,
            maxlength: 4,
            trim: true,
        },
        icaoCode: {
            type: String,
            unique: true,
            uppercase: true,
            minlength: 3,
            maxlength: 4,
            trim: true,
            default: null,
        },

        city: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },

        terminals: {
            type: Number,
            min: [1, "At least one terminal is required"],
        },

        // Audit Fields
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
        minimize: false,
    }
);

const Airport = mongoose.model("Airport", airportSchema);
export default Airport;
