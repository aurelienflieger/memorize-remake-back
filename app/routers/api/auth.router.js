import express from "express";
import { userController } from "../../controllers/index.controller.js";
import { controllerWrapper } from "../../utils/index.util.js";

const authRouter = express.Router();

authRouter.route("/").post(controllerWrapper(userController.login));

authRouter
  .route("/refresh-token")
  .post(controllerWrapper(userController.checkRefreshToken));

export default authRouter;
