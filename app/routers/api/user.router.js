import express from "express";
import { userController } from "../../controllers/index.controller.js";
import decksRouter from "./decks.router.js";
import controllerWrapper from "../../utils/controller-wrapper.util.js";
import validationMiddleware from '../../middlewares/validation.middleware.js';
import { userCreateSchema, userUpdateSchema } from "../../validation/index.validation.js";

const userRouter = express.Router();

userRouter.route("/")
  .post(
    validationMiddleware("body", userCreateSchema),
    controllerWrapper(userController.signup)
  );

userRouter
  .route("/:id")
  .get(controllerWrapper(userController.getByPk))
  .patch(
    validationMiddleware("body", userUpdateSchema),
    controllerWrapper(userController.updateAccount)
  )
  .delete(controllerWrapper(userController.delete));

userRouter.use("/:id/decks", decksRouter);

export default userRouter;
