import ApiError from "../errors/api.error.js";

// The controller wrapper takes a controller as argument & returns a curried controller.
export default function controllerWrapper(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      console.log(error);
      next(new ApiError(error.message, { httpStatus: 500 }));
    }
  };
}
