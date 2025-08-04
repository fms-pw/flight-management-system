import Airport from "../models/airport.model.js";

export const addNewAirport = async (req, res) => {
    try {
        const data = req.body;

        data.createdBy = req.user.sub;

        const airport = await Airport.create(data);

        console.log(airport);

        return res.status(201).json({
            status: "success",
            message: "Airport created successfully",
            data: airport,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal Server error",
            detailed: error.message,
        });
    }
};

export const getAllAirports = async (req, res) => {
    try {
        const airports = await Airport.find().lean();
        console.log(airports);

        const totalAirports = await Airport.countDocuments();

        return res.status(200).json({
            status: "success",
            message: "Airport fetched successfully",
            total: totalAirports,
            data: airports,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Internal Server error",
            detailed: error.message,
        });
    }
};
export const getAirportById = async (req, res) => {
    // Airports fetching Handler by Id
};
export const updateAirportById = async (req, res) => {
    // Airports data update Handler
};
export const deleteAirport = async (req, res) => {
    // Airport delete Handler
};
