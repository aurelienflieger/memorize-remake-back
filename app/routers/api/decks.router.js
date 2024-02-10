import express from "express";
import { deckController } from "../../controllers/index.controller.js";
import cardsRouter from "./cards.router.js";

const decksRouter = express.Router({ mergeParams: true });

decksRouter
  .route("/")
  .get(deckController.getAllDecksByUserID)
  .post(deckController.create);

decksRouter
  .route("/:id")
  .get(deckController.getByPk)
  .patch(deckController.update)
  .delete(deckController.delete);

decksRouter.use("/:id/cards", cardsRouter);

export default decksRouter;
