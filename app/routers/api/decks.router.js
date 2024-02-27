import express from "express";
import { deckController } from "../../controllers/index.controller.js";
import cardsRouter from "./cards.router.js";
import controllerWrapper from "../../utils/controller-wrapper.util.js";
import {
  deckCreateSchema,
  deckUpdateSchema,
} from "../../schemas/index.schema.js";
import {
  validateInput,
  checkForValidAuthentification,
} from "../../middlewares/index.middleware.js";

const decksRouter = express.Router({ mergeParams: true });

decksRouter.use(checkForValidAuthentification);

decksRouter
  .route("/")
  .get(controllerWrapper(deckController.getAllDecksByUserID))
  .post(
    validateInput("body", deckCreateSchema),
    controllerWrapper(deckController.createNewDeck)
  );

decksRouter
  .route("/:id")
  .get(controllerWrapper(deckController.getDeckById))
  .patch(
    validateInput("body", deckUpdateSchema),
    controllerWrapper(deckController.updateDeck)
  )
  .delete(controllerWrapper(deckController.deleteDeck));

decksRouter.use("/:id/cards", cardsRouter);

export default decksRouter;
