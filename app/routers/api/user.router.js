import express from "express";
import { userController } from "../../controllers/index.controller.js";
import decksRouter from "./decks.router.js";
import controllerWrapper from "../../utils/controller-wrapper.util.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { userCreateSchema, userUpdateInfoSchema, userUpdatePasswordSchema } from "../../schemas/index.schema.js";

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
    validationMiddleware("body", userUpdateInfoSchema),
    controllerWrapper(userController.updateAccountInfo)
  )
  .delete(controllerWrapper(userController.delete));

userRouter
  .route("/:id/changepassword")
  .patch(
    validationMiddleware("body", userUpdatePasswordSchema),
    controllerWrapper(userController.updateAccountPassword)
  )
userRouter.use("/:id/decks", decksRouter);

export default userRouter;