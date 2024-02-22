import express from "express";
import { userController } from "../../controllers/index.controller.js";
import { controllerWrapper } from "../../utils/index.util.js";

const authRouter = express.Router();

authRouter.route("/").post(controllerWrapper(userController.login));

authRouter
  .route("/refresh-tokens")
  .post(controllerWrapper(userController.refreshTokens));

export default authRouter;
