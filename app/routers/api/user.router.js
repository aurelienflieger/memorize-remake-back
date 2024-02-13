import express from "express";
import { userController } from "../../controllers/index.controller.js";
import decksRouter from "./decks.router.js";
import controllerWrapper from "../../utils/controller-wrapper.util.js";

const userRouter = express.Router();

userRouter.route("/").post(controllerWrapper(userController.signup));

userRouter
  .route("/:id")
  .get(controllerWrapper(userController.getByPk))
  .patch(controllerWrapper(userController.updateAccount))
  .delete(controllerWrapper(userController.delete));

userRouter.use("/:id/decks", decksRouter);

export default userRouter;
