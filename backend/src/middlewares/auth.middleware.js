import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  // Get secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY;

<<<<<<< HEAD
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
=======
  // Check if secret key is present
  if (!secretKey) {
    console.error("JWT_SECRET_KEY is not defined");
    return res.status(500).json({
      status: "error",
      message: "JWT Secret Keys is missing in environment variables",
    });
  }

  // Retrieve JWT token from cookies
  const token = req.cookies.jwtAuthToken;

  // If token is not found, return unauthorized
  if (!token) {
    return res.status(401).json({
      status: "unauthorized",
      message: "No token provided, please login first",
>>>>>>> fca5f0c93d2f33608416c23d7172f31d30af6e76
    });
  }

  try {
<<<<<<< HEAD
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
=======
    // Verify the JWT token using the secret key
    const decodedToken = jwt.verify(token, secretKey);

    // Attach decoded user info to request object for use in next middlewares/routes
    req.user = decodedToken;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.name, error.message);

    // Handle expired token
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "failed",
        message: "Token expired, please login again",
      });
    }

    // Handle invalid token
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "failed",
        message: "Invalid token, authentication failed",
      });
    }

    // Handle any other authentication error
    return res.status(500).json({
      status: "error",
      message: "Something went wrong during authentication",
>>>>>>> fca5f0c93d2f33608416c23d7172f31d30af6e76
    });
  }
};

export default authenticateUser;
