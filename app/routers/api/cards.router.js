import express from "express";
import { cardController } from "../../controllers/index.controller.js";
import controllerWrapper from "../../utils/controller-wrapper.util.js";
import {
  cardCreateSchema,
  cardUpdateSchema,
} from "../../schemas/index.schema.js";
import {
  validateInput,
  checkForValidAuthentification,
} from "../../middlewares/index.middleware.js";

const cardsRouter = express.Router({ mergeParams: true });

cardsRouter.use(checkForValidAuthentification);

cardsRouter
  .route("/")
  .get(controllerWrapper(cardController.getAllCardsByDeckID))
  .post(
    validateInput("body", cardCreateSchema),
    controllerWrapper(cardController.createNewCard)
  );

cardsRouter
  .route("/:id")
  .get(controllerWrapper(cardController.getByPk))
  .patch(
    validateInput("body", cardUpdateSchema),
    controllerWrapper(cardController.updateCard)
  )
  .delete(controllerWrapper(cardController.delete));

export default cardsRouter;
