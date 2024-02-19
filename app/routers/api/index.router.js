import express from "express";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import swaggerRouter from "./swagger.router.js";

const apiRouter = express.Router();

apiRouter.use("/account", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/docs", swaggerRouter);

export default apiRouter;
