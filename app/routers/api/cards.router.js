import express from "express";
import { cardController } from "../../controllers/index.controller.js";
import controllerWrapper from "../../utils/controller-wrapper.util.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { cardCreateSchema, cardUpdateSchema } from "../../validation/index.validation.js";


const cardsRouter = express.Router({ mergeParams: true });

cardsRouter
  .route("/")
  .get(controllerWrapper(cardController.getAllCardsByDeckID))
  .post(
    validationMiddleware("body", cardCreateSchema),
    controllerWrapper(cardController.createNewCard)
  );

cardsRouter
  .route("/:id")
  .get(controllerWrapper(cardController.getByPk))
  .patch(
    validationMiddleware("body", cardUpdateSchema),
    controllerWrapper(cardController.updateCard)
  )
  .delete(controllerWrapper(cardController.delete));

export default cardsRouter;
