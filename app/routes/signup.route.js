import express from "express";
import controllers from "../controllers/index.js";

const router = express.Router();

router.post("/account", (req, res, next) => controllers.signUp(req, res, next));

export default router;
