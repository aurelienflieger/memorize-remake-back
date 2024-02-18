import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import errorHandler from "./app/middlewares/errorHandler.middleware.js";
import router from "./app/routers/index.router.js";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const corsOptions = { credentials: true, origin: process.env.URL || "*" };

app.use(cors(corsOptions));
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

/* The error handler is placed after all routes to make sure all errors are handled. */
app.use(errorHandler);

app.listen({ port: PORT, host: HOST }, () => {
  console.log(`The back-end server is listening on port:${PORT}`);
});