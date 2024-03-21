import express from "express";
import { userController } from "../../controllers/index.controller.js";
import { controllerWrapper } from "../../utils/index.util.js";
import { validateInput } from "../../middlewares/index.middleware.js";
import authLoginSchema from "../../schemas/auth.login.schema.js";

const authRouter = express.Router();

authRouter
  .route("/")
  .post(
    validateInput("body", authLoginSchema),
    controllerWrapper(userController.login)
  );

/* authRouter
  .route("/refresh-tokens")
  .post(controllerWrapper(userController.refreshTokens)); */

export default authRouter;
