import mongoose from "mongoose";
import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import createError from "http-errors";




  export const getAllUsers = asyncHandler(async (req, res) => {

      // Get page and limit from query parameters, with defaults
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  // Calculate skip value for pagination
  const skip = (page - 1) * limit;

  // Get total count of users for pagination metadata
  const totalUsers = await User.countDocuments();


  // Fetch users with pagination
    const users = await User.find()
      .select("-password")
      .skip(skip) 
      .limit(limit) 
      .lean(); // Convert to plain JavaScript object for performance
  
    if (!users.length) {
      throw createError(404, "No users found");
    }
  
    res.status(200).json({
      success: true,
      count: users.length,
      total:totalUsers,
      page: page,
      totalPages:Math.ceil(totalUsers / limit), 
      data: users,
    });
  });




export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.isValidObjectId(id)) {
    throw createError(400, "Invalid user ID");
  }

  const user = await User.findById(id)
    .select("-password")
    .lean();

  if (!user) {
    throw createError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});





export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;


  if (!mongoose.isValidObjectId(id)) {
    throw createError(400, "Invalid user ID");
  }

  // Prevent updating sensitive fields
  delete updateData.password; // Disallow password updates through this endpoint
  delete updateData.role; // Prevent role changes (optional, based on your requirements)
  delete updateData.isBlocked; // Prevent changing block status
  delete updateData.bookings; // Prevent direct modification of bookings

  // Validate input (optional: add more specific validation as needed)
  const allowedFields = [
    "firstName",
    "lastName",
    "email",
    "mobileNumber",
    "dateOfBirth",
    "gender",
    "profilePicUrl",
    "address",
    "seatPreference",
    "mealPreference",
  ];
  const updates = Object.keys(updateData);
  const isValidUpdate = updates.every((update) => allowedFields.includes(update) || update.startsWith("address."));
  if (!isValidUpdate) {
    throw createError(400, "Invalid fields in update request");
  }

  // Update user with new data
  const user = await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true } // Return updated document, validate schema
  ).select("-password");

  if (!user) {
    throw createError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});



// Delete a user
export const deleteUser = asyncHandler(async (req, res) => {
  // Permanently deletes a user identified by ID
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.isValidObjectId(id)) {
    throw createError(400, "Invalid user ID");
  }

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw createError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
