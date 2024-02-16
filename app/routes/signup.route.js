import express from "express";
import controllers from "../controllers/index.js";

const router = express.Router();

router.post("/api/sign-up", (req, res, next) =>
  controllers.signUp(req, res, next)
);

export default router;
