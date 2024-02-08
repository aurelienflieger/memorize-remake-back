import express from "express";
import controllers from "../controllers/index.js";

const router = express.Router();

router.post("/api/login", (req, res, next) =>
  controllers.login(req, res, next)
);

export default router;
