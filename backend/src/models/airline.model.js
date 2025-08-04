import mongoose from "../database/mongodb.config.js";

const airlineSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true, index: true },

        iataCode: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            minlength: 2,
            maxlength: 3,
            trim: true,
        },
        icaoCode: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            minlength: 3,
            maxlength: 4,
            trim: true,
        },

        country: { type: String, required: true, trim: true, index: true },
        logoUrl: { type: String, trim: true, default: null },

        contact: {
            number: { type: String, trim: true, default: null },
            email: { type: String, lowercase: true, match: /.+\@.+\..+/, default: null },
            website: { type: String, match: /^https?:\/\/.+/, default: null },
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

const Airline = mongoose.model("Airline", airlineSchema);
export default Airline;
