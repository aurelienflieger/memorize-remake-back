import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { handleErrors } from "./app/middlewares/index.middleware.js";
import router from "./app/routers/index.router.js";

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const corsOptions = {
  credentials: true,
  origin: process.env.URL || "*",
  allowedHeaders: ["Content-Type", "Authorization", "x-refresh-token"],
};

app.use(cors(corsOptions));
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

/* The error handler is placed after all routes to make sure all errors are handled. */
app.use(handleErrors);

app.listen({ port: PORT, host: HOST }, () => {
  console.log(`The back-end server is listening on port:${PORT}`);
});
