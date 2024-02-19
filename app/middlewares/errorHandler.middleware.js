// The error handler automatically handles all Express errors and sends the appropriate status.
export default (error, _, res, next) => {
  console.log(error);
  return res.status(error.httpStatus).json({ error: error.message });
}