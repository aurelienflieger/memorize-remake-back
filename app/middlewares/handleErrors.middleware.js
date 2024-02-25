import debugLogger from "../utils/debugLogger.util.js";

const logger = debugLogger();

// The error handler automatically handles all Express errors and sends the appropriate status.
const handleErrors = (error, _, res, next) => {
  logger(error);
  return res.status(error.httpStatus).json({ error: error.message });
};

export default handleErrors;
