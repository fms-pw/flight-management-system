import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import User from "../models/user.model.js";
import generateToken from "../utils/jwt.utils.js";
import cookieOptions from "../config/cookie.config.js";

// Controller to handle user signup
export const signupUser = async (req, res) => {
  try {
    // Extract email and mobileNumber from the request body
    const { email, mobileNumber } = req.body;

    // Prepare query object to search for existing user
    const userParams = {};

    // Prefer email if provided, otherwise use mobile number
    if (email) {
      userParams.email = email; // Search by email
    } else {
      userParams.mobileNumber = mobileNumber; // Search by mobile number
    }

    // Check if user already exists with given email or mobile number
    const existingUser = await User.findOne(userParams);

    if (existingUser) {
      // Identify which fields are duplicates
      const duplicates =
        existingUser.email === email && existingUser.mobileNumber === mobileNumber
          ? `email ${email} and mobile number ${mobileNumber}`
          : existingUser.email === email
          ? `email ${email}`
          : `mobile number ${mobileNumber}`;

      // Respond with specific duplicate field message
      return res.status(409).json({
        status: "conflict",
        message: `An account already exists with this ${duplicates}`,
      });
    }

    // Create a new user with the data from the request body
    const newUser = await User.create(req.body);

    // Data to encode in the token
    const payload = {
      email: newUser.email,
      role: newUser.role,
    };
    const userId = newUser._id.toString();

    // Generate JWT Token
    await generateToken(payload, userId, res);

    res.status(201).json({
      status: "success",
      message: `Congratulation! ${newUser.firstName} ${newUser.lastName} Your account has been created successfully`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "User registration failed",
      error: error.name,
      details: error.message,
    });
  }
};

// Controller to handle user login
export const loginUser = async (req, res) => {
  try {
    // Extract email and mobileNumber from the request body
    const { email, mobileNumber, password } = req.body;

    // Allow only one of email or mobileNumber, not both or none
    if ((!email && !mobileNumber) || (email && mobileNumber)) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide either email or mobile number, not both.",
      });
    }

    // Password is required for login
    if (!password) {
      return res.status(422).json({ success: "failed", message: "Password is required." });
    }

    // Prepare query object to search for existing user
    const userParams = {};

    // Prefer email if provided, otherwise use mobile number
    if (email) {
      userParams.email = email; // Search by email
    } else {
      userParams.mobileNumber = mobileNumber; // Search by mobile number
    }

    const user = await User.findOne(userParams).select("+password");

    // If user not found, send error
    if (!user) {
      return res.status(401).json({ status: "failed", message: "User not found!" });
    }

    // Retrieve the stored hashed password from the user document
    const hashedPassword = user.password;

    // Verify the user-provided password against the stored hash
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    // If password does not match, send error
    if (!isPasswordMatch) {
      return res.status(401).json({ status: "failed", message: "Invalid Password" });
    }

    // Data to encode in the token (payload)
    const payload = {
      email: user.email,
      role: user.role,
    };
    const userId = user._id.toString();
    // Generate JWT Token
    await generateToken(payload, userId, res);

    res.status(200).json({
      status: "success",
      message: `Welcome back, ${user.firstName}! You have logged in successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "User login failed",
      error: error.name,
      details: error.message,
    });
  }
};

// Controller to handle user logout
export const logoutUser = (_req, res) => {
  try {
    res.clearCookie("jwtAuthToken", cookieOptions);
    return res.status(200).json({ status: "success", message: "User logged out successfully" });
  } catch (error) {
    // This is not necessary that error will occur here often, but for safety
    return res.status(500).json({
      status: "failed",
      message: "Logout failed",
      error: error.name,
      details: error.message,
    });
  }
};

// Controller to handle user forgot Password
export const forgotUserPassword = async (req, res) => {
  try {
    // Extract email and mobileNumber from the request body
    const { email, mobileNumber } = req.body;

    // Allow only one of email or mobileNumber, not both or none
    if ((!email && !mobileNumber) || (email && mobileNumber)) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide either email or mobile number, not both.",
      });
    }
    // Prepare query object to search for existing user
    const userParams = {};

    // Prefer email if provided, otherwise use mobile number
    if (email) {
      userParams.email = email;
    } else {
      userParams.mobileNumber = mobileNumber;
    }

    // Find the user by email or mobile number
    const user = await User.findOne(userParams);

    // If user not found, send error
    if (!user) {
      return res.status(401).json({ status: "failed", message: "User not registered!" });
    }

    const token = uuidv4();

    // Generate a salt for hashing
    const salt = await bcrypt.genSalt(10);

    const hashedToken = await bcrypt.hash(token, salt);

    user.resetPasswordToken = hashedToken;
    user.resetPasswordTokenExpires = Date.now() + 1000 * 60 * 60;

    await user.save();
    return res.status(200).json({
      status: "success",
      message: "Password Reset token generated",
      token: token,
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);

    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while processing your request.",
      error: error.name,
      details: error.message,
    });
  }
};
export const resetUserPassword = async (req, res) => {
  // password reset controller
};
