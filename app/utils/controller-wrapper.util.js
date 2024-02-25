import ApiError from "../errors/api.error.js";
import debugLogger from "./debugLogger.util.js";

const logger = debugLogger();

// The controller wrapper takes a controller as argument & returns a curried controller.
export default function controllerWrapper(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      logger(error);
      next(new ApiError(error.message, { httpStatus: 500 }));
    }
  };
}
