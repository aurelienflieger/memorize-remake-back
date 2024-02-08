import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import errorHandler from "./app/middleware/errorHandler.middleware.js";
import { signUpRouter, loginRouter } from "./app/routes/index.js";

const app = express();
const corsOptions = { credentials: true, origin: process.env.URL || "*" };
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

app.use(cors(corsOptions));
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(signUpRouter);
app.use(loginRouter);

/* The error handler is placed after all routes to make sure all errors are handled. */
app.use(errorHandler);

app.listen({ port: PORT, host: HOST }, () => {
  console.log(`The back-end server is listening on port:${PORT}`);
});
