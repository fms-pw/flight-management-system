import Airline from "../models/airline.model.js";

export const addNewAirline = async (req, res) => {
    try {
        const data = req.body;

        data.createdBy = req.user.sub;

        const airline = await Airline.create(data);
        console.log(airline);
        return res.status(201).json({
            status: "success",
            message: "Airline created successfully",
            data: airline,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal Server error",
            detailed: error.message,
        });
    }
};
export const getAllAirlines = async (req, res) => {
    try {
        const airlines = await Airline.find().lean();
        console.log(airlines);
        const totalAirlines = await Airline.countDocuments();

        return res.status(200).json({
            status: "success",
            message: "Airlines fetched successfully",
            total: totalAirlines,
            data: airlines,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal Server error",
            detailed: error.message,
        });
    }
};

export const getAirlineById = async (req, res) => {
    // Get airline by Id
};
export const updateAirlineById = async (req, res) => {
    // Update all airlines by Id
};
export const deleteAirline = async (req, res) => {
    // Delete all airlines by Id
};
