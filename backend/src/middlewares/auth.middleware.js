import jwt from "jsonwebtoken";

// Middleware to authenticate user using JWT
const authenticateUser = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  // Validate Secret Keys from environment variables
  if (!secretKey) {
    console.error("JWT_SECRET_KEY is not defined");
    return res.status(500).json({ status: "error", message: "JWT Secret Keys is missing in environment variables" });
  }

  // Retrieve JWT from cookies
  const token = req.cookies.jwtAuthToken;

  // JWT token not found in cookies
  if (!token) {
    return res.status(401).json({ status: "error", message: "Unauthorized: No token provided" });
  }

  try {
    // Validate JWT token
    const verifyJwtToken = jwt.verify(token, secretKey);

    // Store decoded user information in request object
    req.user = verifyJwtToken;

    console.debug("\nDecoded Token \n", verifyJwtToken);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired JWT token
    console.error("JWT verification failed:", error.name, error.message);
    res.status(403).json({
      error: error.name,
      massage: error.message,
    });
  }
};

export default authenticateUser;
