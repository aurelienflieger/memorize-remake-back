import controllerWrapper from "../utils/controller-wrapper.util.js";
import UserController from "./user.controller.js";

const userController = new UserController();

export default {
  login: controllerWrapper(userController.login),
  signUp: controllerWrapper(userController.signup),
};
