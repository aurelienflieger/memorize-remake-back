import express from "express";
import { userController } from "../../controllers/index.controller.js";

const authRouter = express.Router();

authRouter.route("/")
  .post(userController.login);

export default authRouter;
