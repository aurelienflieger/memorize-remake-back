import express from "express";
import controllerWrapper from "../../utils/controller.wrapper.js";
import CardController from "../../controllers/card.controller.js";

const cardsRouter = express.Router();

cardsRouter
  .route("/:userid")
  .get(
    controllerWrapper(CardController.getAllCardsByDeckID.bind(CardController))
  )
  .post(controllerWrapper(CardController.create.bind(CardController)))
  .patch(controllerWrapper(CardController.update.bind(CardController)))
  .delete(controllerWrapper(CardController.delete.bind(CardController)));

export default cardsRouter;
