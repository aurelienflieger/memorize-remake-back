import express from "express";
import { userController } from "../../controllers/index.controller.js";

const accountRouter = express.Router({ mergeParams: true });

accountRouter.route("/auth").post(userController.login);

export default accountRouter;
