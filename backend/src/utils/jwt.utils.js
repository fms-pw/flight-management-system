import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import cookieOptions from "../config/cookie.config.js";

const generateToken = (payload, userId, res) => {
  try {
    // prettier-ignore
    // JWT options for token generation
    const tokenOptions = {
      issuer: "pwflights",          // Token issuer name
      jwtid: uuidv4(),              // Unique token ID for each token
      subject: userId,              // User ID for whom the token is generated
      expiresIn: "5m",              // Token expiry time (5 minute)
    };

    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error("Missing JWT Secret Keys");
    }

    // Sign and generate the JWT
    const token = jwt.sign(payload, secretKey, tokenOptions);

    // Set the JWT token as a cookie in the response
    if (token) {
      res.cookie("jwtAuthToken", token, cookieOptions);
    }
    return token;
  } catch (error) {
    console.error("JWT generation error:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to generate token",
      error: error.name,
      details: error.message,
    });
  }
};
export default generateToken;
