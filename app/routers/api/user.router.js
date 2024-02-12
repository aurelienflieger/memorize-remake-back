import express from "express";
import { userController } from "../../controllers/index.controller.js";
import decksRouter from "./decks.router.js";
import controllerWrapper from "../../utils/controller-wrapper.util.js";

const userRouter = express.Router({ mergeParams: true });

userRouter.route("/").post(controllerWrapper(userController.signup));

userRouter
  .route("/:accountid")
  .get(controllerWrapper(userController.getByPk))
  .patch(controllerWrapper(userController.update))
  .delete(controllerWrapper(userController.delete));

userRouter.use("/:accountid/decks", decksRouter);

export default userRouter;
