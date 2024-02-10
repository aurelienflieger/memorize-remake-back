import express from "express";
import { userController } from "../../controllers/index.controller.js";

const authRouter = express.Router({ mergeParams: true });

authRouter.route("/").post(userController.login);

export default authRouter;
