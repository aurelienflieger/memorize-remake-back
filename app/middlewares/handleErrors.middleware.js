// The error handler automatically handles all Express errors and sends the appropriate status.
const handleErrors = (error, _, res, next) => {
  console.log(error);
  res.status(error.httpStatus).json({ code: error.errorCode, message: error.message, details: error.details  });
  next();
};

export default handleErrors;
