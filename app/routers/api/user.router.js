import express from "express";
import { userController } from "../../controllers/index.controller.js";
import decksRouter from "./decks.router.js";
import controllerWrapper from "../../utils/controller-wrapper.util.js";
import {
  userCreateSchema,
  userUpdateInfoSchema,
  userUpdatePasswordSchema,
} from "../../schemas/index.schema.js";

import {
  validateInput,
  checkForValidAuthentification,
} from "../../middlewares/index.middleware.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(
    validateInput("body", userCreateSchema),
    controllerWrapper(userController.signup)
  );

userRouter.use(checkForValidAuthentification);

userRouter
  .route("/:id")
  .get(controllerWrapper(userController.getByPk))
  .patch(
    validateInput("body", userUpdateInfoSchema),
    controllerWrapper(userController.updateAccountInfo)
  )
  .delete(controllerWrapper(userController.deleteUser));

userRouter
  .route("/:id/change-password")
  .patch(
    validateInput("body", userUpdatePasswordSchema),
    controllerWrapper(userController.updateAccountPassword)
  );
userRouter.use("/:id/decks", decksRouter);

export default userRouter;
