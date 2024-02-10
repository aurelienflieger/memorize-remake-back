import express from "express";
import controllers from "../../controllers/index.controller.js";

const signupRouter = express.Router();

signupRouter
  .route("/")
  .post((req, res, next) => controllers.signUp(req, res, next));

export default signupRouter;
