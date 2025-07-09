/**
 * Express.js' global-level error handling middleware.
 * Catches unhandled errors and sends a standardized JSON error response.
 */
const errorHandler = (err, req, res, next) => {
  return res.status(500).json({
    status: "error",
    message: "Unexpected Error : Internal Server Error",
    detailed: err.message,
  });
};

export default errorHandler;
