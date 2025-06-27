import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const generateJWTtoken = (payload, res) => {
  try {
    // prettier-ignore
    // JWT options for token generation
    const options = {
      issuer: "pwflights",          // Token issuer name
      jwtid: uuidv4(),              // Unique token ID for each token
      subject: payload.userId,      // User ID for whom the token is generated
      expiresIn: "2m",              // Token expiry time (2 minute)
    };

    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error("Missing JWT Secret Keys");
    }

    // Sign and generate the JWT
    const token = jwt.sign(payload, secretKey, options);

    if (!token) {
      console.error("\nToken Generation Failed. No token returned.\n");
      return res.status(500).json({
        status: "failed",
        message: "Token Generation Failed. Please Try Again",
      });
    }

    // prettier-ignore
    // Cookie options for storing JWT in browser cookies
    const cookieOptions = {
      maxAge: 1000 * 60 * 60,         // Cookie valid for 1 hour
      httpOnly: true,                 // Cookie not accessible via JavaScript
      // secure: true,                   // Cookie sent only over HTTPS
      domain: process.env.DOMAIN,     // Domain for which cookie is valid
      path: "/",                      // Cookie valid for all routes
      sameSite: "None",               // Allow cross-site cookie
    };
    // Log the cookie Options for debugging Purpose
    console.debug("Cookie Options : ", cookieOptions);

    // Set the JWT token as a cookie in the response
    if (token) {
      res.cookie("jwtAuthToken", token, cookieOptions);
    }
    return token;
  } catch (error) {
    console.error("JWT generation error:", error);
    res.status(500).json({ status: "failed", message: error.message });
  }
};
