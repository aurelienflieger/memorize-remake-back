import express from "express";
import controllerWrapper from "../../utils/controller.wrapper.js";
import signUpController from "../../controllers/signup.controller.js";

const signupRouter = express.Router();

signupRouter.route("/")
  .post(controllerWrapper(signUpController.signup));

export default signupRouter;