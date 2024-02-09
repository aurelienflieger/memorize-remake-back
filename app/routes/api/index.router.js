import express from "express";
import signupRouter from "./signup.route.js";
import loginRouter from "./login.route.js";

const apiRouter = express.Router();

apiRouter.use("/account", signupRouter);
apiRouter.use("/auth", loginRouter);

export default apiRouter;
