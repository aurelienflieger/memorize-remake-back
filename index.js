import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { handleErrors } from "./app/middlewares/index.middleware.js";
import router from "./app/routers/index.router.js";
import debugLogger from "./app/utils/debugLogger.util.js";

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

const corsOptions = {
  credentials: true,
  origin: process.env.URL || "*",
  allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
};
const logger = debugLogger("index.js");

app.use(cors(corsOptions));
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

/* The error handler is placed after all routes to make sure all errors are handled. */
app.use(handleErrors);

const server = app.listen({ port: PORT, host: HOST }, () => {
  logger(
    `The back-end server was successfully started on host ${HOST} on port ${PORT}.`
  );
});

server.on("error", (error) => {
  logger(
    `The back-end server could not be started on port:${PORT}. The following error was returned. ${error.message}`
  );
});
