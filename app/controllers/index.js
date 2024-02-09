import controllerWrapper from "../utils/controller-wrapper.util.js";
import signUpController from "./signup.controller.js";
import loginController from "./login.controller.js";

export default {
  login: controllerWrapper(loginController),
  signUp: controllerWrapper(signUpController),
};
