import CoreController from "./core.controller.js";
import {CardDataMapper} from "../datamappers/index.datamapper.js";
import ApiError from "../errors/api.error.js";
import { createFailedCreationError, createMissingIdError, createResourceNotFoundError, createUpdateNotModifiedError } from "../errors/helpers.error.js";

/* The methods from the CoreDataMapper are available in addition to those specific to the Card. */
export default class CardController extends CoreController {
  constructor() {
    const datamapper = new CardDataMapper();

    super(datamapper);

    this.datamapper = datamapper;
  }

  getAllCardsByDeckID = async (req, res) => {
    const { id: deckId } = req.params;

    if (!deckId) {
      throw createMissingIdError(req, {entityName : "deck"});
    }

    const cardsMatchingDeckId = await this.datamapper.findAllCardsByDeckID(deckId);
    
    if (!cardsMatchingDeckId) {
      throw new createResourceNotFoundError(req, {entityName: "deck", targetName: "card"});
    }
    
    res.status(200).json(cardsMatchingDeckId);
  };

  createNewCard = async (req, res) => {
    const { id: deckId } = req.params;

    if (!deckId) {
      throw createMissingIdError(req, {entityName : "deck"});
    }

    const card = { ...req.body, deck_id: deckId };

    const createdCard = await this.datamapper.insert(card);

    if (!createdCard) {
      throw createFailedCreationError(req, {entityName: "card"});
    }

    res.status(200).json(createdCard);
  };

  updateCard = async (req, res) => {
    const { id: deckId } = req.params;

    if (!deckId) {
      throw createMissingIdError(req, {entityName : "deck"});
    }

    let { front, back } = req.body;

    const cardMatchingDeckId = await this.datamapper.findByPk(deckId);

    if (!cardMatchingDeckId) {
      throw createResourceNotFoundError(req, {entityName: "deck", targetName: "card"});
    }

    front ? front : front = cardMatchingDeckId.front;
    back ? back : back = cardMatchingDeckId.back;

    const isNotModified = cardMatchingDeckId.front === front && cardMatchingDeckId.back === back;

    if (isNotModified) {
      throw createUpdateNotModifiedError(req, {entityName: "card"});
    }

    const updatedCardInfo = { ...cardMatchingDeckId, front: front, back: back };

    const updatedCard = await this.datamapper.update(updatedCardInfo);

    if (!updatedCard) {
      throw createUpdateNotModifiedError(req, {entityName: "card"});
    }

    return res.status(200).json(updatedCard);
  };
}
