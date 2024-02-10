import express from "express";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";

const apiRouter = express.Router({ mergeParams: true });

apiRouter.use("/account", userRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
