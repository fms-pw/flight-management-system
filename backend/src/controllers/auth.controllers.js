import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
        status: `failed`,
        message: `An account already exists with this ${duplicates}`,
      });
    }

    // Create a new user with the data from the request body
    const newUser = await User.create(req.body);
    const { _id, firstName, lastName } = newUser;

    // Send success response
    res.status(201).json({
      status: `success`,
      message: `Congratulation! ${firstName} ${lastName} Your account has been successfully created.`,
      UserId: _id,
    });
  } catch (error) {
    // Send error response if registration fails
    res.status(500).json({
      status: "User registration failed",
      error: error.name,
      message: error.message,
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
        message: "Please provide either email or mobile number, not both.",
      });
    }

    // Password is required for login
    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    // Find the user by email or mobile number, include password field
    const user = await User.findOne({
      $or: [{ email: email }, { mobileNumber: mobileNumber }],
    }).select("+password");

    // If user not found, send error
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    // Retrieve the stored hashed password from the user document
    const hashedPassword = user.password;

    // Verify the user-provided password against the stored hash
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    // If password does not match, send error
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    } else {
      // Send a success response with a welcome message
      const { firstName, lastName } = user;
      res.status(200).json({
        status: "success",
        message: `Welcome back, ${firstName} ${lastName}! You have logged in successfully.`,
      });
    }
  } catch (error) {
    // Send error response if login fails
    res.status(500).json({
      status: "Something went wrong",
      error: error.name,
      message: error.message,
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

