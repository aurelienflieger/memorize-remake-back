import express from 'express';
import decksRouter from './deck.router.js';
import signupRouter from "./signup.router.js"

const apiRouter = express.Router();

apiRouter.use("/decks", decksRouter);
apiRouter.use("/signup", signupRouter)

export default apiRouter;