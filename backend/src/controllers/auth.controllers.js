import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWTtoken } from "../utils/jwt.utils.js";

// Controller to handle user signup
export const signupUser = async (req, res) => {
  try {
    const { email, mobileNumber } = req.body;
    // Check if user already exists with given email or mobile number
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });

    if (existingUser) {
      // Identify which fields are duplicates
      const duplicates =
        existingUser.email === email && existingUser.mobileNumber === mobileNumber
          ? `email ${email} and mobile number ${mobileNumber}`
          : existingUser.email === email
          ? `email ${email}`
          : `mobile number ${mobileNumber}`;

      // Respond with specific duplicate field message
      return res.status(400).json({
        success: false,
        message: `An account already exists with this ${duplicates}`,
      });
    }

    // Create a new user with the data from the request body
    const newUser = await User.create(req.body);

    // Data to encode in the token
    const payload = {
      userId: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
    };

    // Log the payload for debugging purposes
    console.debug("\nPayload for Token Generation \n", payload);

    // Generate JWT Token
    const token = await generateJWTtoken(payload, res);

    // Log the generated token for debugging purposes
    console.debug("\nGenerated JWT Token at Signup \n", token);

    res.status(201).json({
      success: true,
      message: `Congratulation! ${newUser.firstName} ${newUser.lastName} Your account has been created successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.name,
      details: error.message,
    });
  }
};

// Controller to handle user login
export const loginUser = async (req, res) => {
  try {
    const { email, mobileNumber, password } = req.body;

    // Allow only one of email or mobileNumber, not both or none
    if ((!email && !mobileNumber) || (email && mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: "Please provide either email or mobile number, not both.",
      });
    }

    // Password is required for login
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required." });
    }

    // Find the user by email or mobile number, include password field
    const user = await User.findOne({
      $or: [{ email: email }, { mobileNumber: mobileNumber }],
    }).select("+password");

    // If user not found, send error
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found!" });
    }

    // Retrieve the stored hashed password from the user document
    const hashedPassword = user.password;

    // Verify the user-provided password against the stored hash
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    // If password does not match, send error
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    // Data to encode in the token (payload)
    const payload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
    // Generate JWT Token
    const token = await generateJWTtoken(payload, res);

    // Log the generated token for debugging purposes
    console.debug("\nGenerated JWT Token at Login \n", token);

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.firstName}! You have logged in successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User login failed",
      error: error.name,
      details: error.message,
    });
  }
};

// Controller to handle user logout
export const logoutUser = () => {
  // user logout controller
};

// Controller to handle user forgot Password
export const forgotUserPassword = () => {
  // user forgot-password controller
};
