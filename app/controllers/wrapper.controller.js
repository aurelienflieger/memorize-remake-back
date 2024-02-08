// The controller wrapper takes a controller as argument & returns a curried controller.
export default function controllerWrapper(controller) {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
