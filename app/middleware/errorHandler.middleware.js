// The error handler automatically handles all Express errors and sends the appropriate status.
export default function errorHandler(err, _, res) {
  console.error(err.stack);

  res.status(err.status || 500);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
}
