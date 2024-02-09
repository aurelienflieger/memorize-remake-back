import express from "express";
import controllerWrapper from "../../utils/controller.wrapper.js";
import DeckController from "../../controllers/deck.controller.js";

const decksRouter = express.Router();

decksRouter.route("/:userid")
  .get(controllerWrapper(DeckController.getAllDecksByUserID.bind(DeckController)))
  .post(controllerWrapper(DeckController.create.bind(DeckController)))
  .patch(controllerWrapper(DeckController.update.bind(DeckController)))
  .delete(controllerWrapper(DeckController.delete.bind(DeckController)));

export default decksRouter;