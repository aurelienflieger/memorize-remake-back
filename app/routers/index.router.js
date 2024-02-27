import express from "express";
import apiRouter from "./api/index.router.js";
import ApiError from "../errors/api.error.js";

const router = express.Router();

router.use("/api", apiRouter);

router.use((_, __, next) => {
  const error = new ApiError("Ressource not found.", { httpStatus: 404 });
  error.name = "NotFound";
  next(error);
});

export default router;
