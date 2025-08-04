import mongoose from "../database/mongodb.config.js";
import generateSeats from "../utils/generateSeats.js";

// seat schema representing individual seat details
const seatSchema = new mongoose.Schema(
    {
        seatNumber: {
            type: String,
            required: true,
        },
        seatClass: {
            type: String,
            enum: ["economy", "premium", "business", "first"],
            default: "economy", // Fallback to economy if not specified seat class
            required: true,
            trim: true,
        },
        seatPreference: {
            type: String,
            enum: ["window", "middle", "aisle"],
            required: true,
        },

        isBooked: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    }
);

// Main Flight schema schema
const flightSchema = new mongoose.Schema(
    {
        flightNumber: {
            type: String,
            required: true,
            unique: true, // Enforce unique flight identifiers
            trim: true,
        },
        airline: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airline",
            required: true,
        },
        departureAirport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airport",
            required: true,
        },
        arrivalAirport: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Airport",
            required: true,
        },

        departureTime: {
            type: Date,
            required: true, // Scheduled departure timestamp
        },
        arrivalTime: {
            type: Date,
            required: true, // Scheduled arrival timestamp
        },
        durationTime: {
            type: String, // Auto-calculated
        },

        seats: {
            type: [seatSchema],
            default: [], // Populated in pre-save hook if empty
        },

        totalSeats: {
            type: Number,
            default: 0, // Auto-calculated
        },
        bookedSeats: {
            type: Number,
            default: 0, // Auto-calculated
        },
        availableSeats: {
            type: Number,
            default: 0, // Auto-calculated
        },

        status: {
            type: String,
            required: true,
            enum: ["scheduled", "delayed", "cancelled", "boarding", "departed", "landed"],
            default: "scheduled",
            trim: true,
        },
    },
    {
        timestamps: true,
        minimize: false,
    }
);

flightSchema.pre("save", function (next) {
    // calculate flight duration time
    const differanceTime = this.arrivalTime - this.departureTime;

    const totalMinutes = Math.floor(differanceTime / 1000 / 60);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    this.durationTime = `${hours}h ${minutes}m`;

    // Generate seats only if none exist
    if (this.seats.length === 0) {
        this.seats = generateSeats();
    }

    // Update seat counts
    this.totalSeats = this.seats.length;
    this.bookedSeats = this.seats.filter((seat) => seat.isBooked).length;
    this.availableSeats = this.totalSeats - this.bookedSeats;

    next(); // Proceed with save
});

const Flight = mongoose.model("Flight", flightSchema);
export default Flight;
