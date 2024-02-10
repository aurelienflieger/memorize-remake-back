import express from "express";
import controllers from "../../controllers/index.controller.js";

const loginRouter = express.Router();

loginRouter
  .route("/")
  .post((req, res, next) => controllers.login(req, res, next));

export default loginRouter;
