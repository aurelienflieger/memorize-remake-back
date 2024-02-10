import cardsRouter from "./cards.route";
import express from "express";

const router = express.Router({ mergeParams: true });
router.use("/:deckId/cards", cardsRouter);

export default router;
