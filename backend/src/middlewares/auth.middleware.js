import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  //Ensure secret key exists
  if (!secretKey) {
    console.error("JWT_SECRET_KEY is not defined in environment variables");
    return res.status(500).json({
      status: "error",
      message: "Server error: JWT secret key is missing",
    });
  }

  // Get token from cookies or Authorization header
  const cookieToken = req.cookies?.jwtAuthToken;
  const headerToken = req.header("Authorization")?.replace("Bearer ", "");
  const token = cookieToken || headerToken;

  //If no token provided
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized: No token provided",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    console.debug("JWT verified successfully:", decoded);

    //Proceed to the next middleware handler
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.name, error.message);
    return res.status(403).json({
      error: error.name,
      message: error.message,
    });
  }
};

export default authenticateUser;
