import express from "express";
import controllerWrapper from "../../utils/controller.wrapper.js";
import CardController from "../../controllers/card.controller.js";

const cardsRouter = express.Router({ mergeParams: true });

cardsRouter
  .route("/:cardId")
  .get(controllerWrapper(CardController.getSingleCardById.bind(CardController)))
  .route("/:cards")
  .get(
    controllerWrapper(CardController.getAllCardsByDeckID.bind(CardController))
  )
  .post(controllerWrapper(CardController.create.bind(CardController)))
  .patch(controllerWrapper(CardController.update.bind(CardController)))
  .delete(controllerWrapper(CardController.delete.bind(CardController)));

export default cardsRouter;
