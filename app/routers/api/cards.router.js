import express from "express";
import { cardController } from "../../controllers/index.controller.js";
import controllerWrapper from "../../utils/controller-wrapper.util.js";

const cardsRouter = express.Router({ mergeParams: true });

cardsRouter
  .route("/")
  .get(controllerWrapper(cardController.getAllCardsByDeckID))
  .post(controllerWrapper(cardController.create));

cardsRouter
  .route("/:id")
  .get(controllerWrapper(cardController.getByPk))
  .patch(controllerWrapper(cardController.update))
  .delete(controllerWrapper(cardController.delete));

export default cardsRouter;
