import express from "express";
import controllers from "../controllers/index.js";

const router = express.Router();

router.post("/auth", (req, res, next) => controllers.login(req, res, next));

export default router;
