import express from "express";
import { deckController } from "../../controllers/index.controller.js";
import cardsRouter from "./cards.router.js";
import controllerWrapper from "../../utils/controller-wrapper.util.js";

const decksRouter = express.Router({ mergeParams: true });

decksRouter
  .route("/")
  .get(controllerWrapper(deckController.getAllDecksByUserID))
  .post(controllerWrapper(deckController.createNewDeck));

decksRouter
  .route("/:id")
  .get(controllerWrapper(deckController.getByPk))
  .patch(controllerWrapper(deckController.update))
  .delete(controllerWrapper(deckController.delete));

decksRouter.use("/:id/cards", cardsRouter);

export default decksRouter;
