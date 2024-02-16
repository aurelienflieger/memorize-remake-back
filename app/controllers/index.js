import controllerWrapper from "./wrapper.controller.js";
import signUpController from "./signup.controller.js";
import loginController from "./login.controller.js";

export default {
  login: controllerWrapper(loginController),
  signUp: controllerWrapper(signUpController),
};
