// Internal Server Error Middleware
const internalServerError = (err, req, res, next) => {
  // Set the status code to 500 if it's not already set
  err.statusCode = err.statusCode || 500;
  err.status = 'error';

  // Set the error message to "Internal Server Error" if no specific message is provided
  const message = err.message || 'Internal Server Error';

  res.status(err.statusCode).json({
    status: err.status,
    message: message,
    // Optionally include error details for development purposes
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
};

// Not Found Error Middleware
const notFoundError = (req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  err.status = 'fail';
  next(err); // Pass error to the next error handler
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.username) {
    return next(); // User is authenticated, proceed to the next middleware or route
  } else {
    res.redirect('/login'); // Redirect to login page if not authenticated
  }
};

module.exports = {
  isAuthenticated,
  internalServerError,
  notFoundError,
};