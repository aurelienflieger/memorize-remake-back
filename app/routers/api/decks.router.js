import express from "express";
import { deckController } from "../../controllers/index.controller.js";
import cardsRouter from "./cards.router.js";
import controllerWrapper from "../../utils/controller-wrapper.util.js";
import validationMiddleware from "../../middlewares/validation.middleware.js";
import { deckCreateSchema, deckUpdateSchema } from "../../schemas/index.schema.js";

const decksRouter = express.Router({ mergeParams: true });

decksRouter
  .route("/")
  .get(controllerWrapper(deckController.getAllDecksByUserID))
  .post(
    validationMiddleware("body", deckCreateSchema),
    controllerWrapper(deckController.createNewDeck)
  );

decksRouter
  .route("/:id")
  .get(controllerWrapper(deckController.getByPk))
  .patch(
    validationMiddleware("body", deckUpdateSchema),
    controllerWrapper(deckController.updateDeck)
  )
  .delete(controllerWrapper(deckController.delete));

decksRouter.use("/:id/cards", cardsRouter);

export default decksRouter;