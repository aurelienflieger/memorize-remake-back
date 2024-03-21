import CoreController from "./core.controller.js";
import { CardDataMapper } from "../datamappers/index.datamapper.js";
import {
  createFailedCreationError,
  createFailedUpdateError,
  createMissingIdError,
  createMissingParamsError,
  createResourceNotFoundError,
  createUpdateNotModifiedError,
} from "../errors/helpers.error.js";

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
      throw createMissingIdError(req, { entityName: "deck" });
    }

    const cardsMatchingDeckId = await this.datamapper.findAllCardsByDeckID(
      deckId
    );

    if (!cardsMatchingDeckId) {
      throw new createResourceNotFoundError(req, {
        entityName: "deck",
        targetName: "card",
      });
    }

    res.status(200).json(cardsMatchingDeckId);
  };

  createNewCard = async (req, res) => {
    const { id: deckId } = req.params;

    if (!deckId) {
      throw createMissingIdError(req, { entityName: "deck" });
    }

    const card = { ...req.body, deck_id: deckId };

    const createdCard = await this.datamapper.insert(card);

    if (!createdCard) {
      throw createFailedCreationError(req, { entityName: "card" });
    }

    res.status(200).json(createdCard);
  };

  updateCard = async (req, res) => {
    const { id: cardId } = req.params;

    if (!cardId) {
      throw createMissingIdError(req, { entityName: "card" });
    }

    let { front, back } = req.body;

    const cardMatchingId = await this.datamapper.findByPk(cardId);

    if (!cardMatchingId) {
      throw createResourceNotFoundError(req, {
        entityName: "card",
        targetName: "card",
      });
    }

    /* 
    The value of the card's front or back is set to either the value(s) provided in the request body, or 
    the existing values from the database.
    */
    front ? front : (front = cardMatchingId.front);
    back ? back : (back = cardMatchingId.back);

    const isNotModified =
      cardMatchingId.front === front && cardMatchingId.back === back;

    if (isNotModified) {
      throw createUpdateNotModifiedError(req, { entityName: "card" });
    }

    // We create an object containing all properties of the card to update in addition to any updated fields.
    const updatedCardInfo = { ...cardMatchingId, front: front, back: back };

    const updatedCard = await this.datamapper.update(updatedCardInfo);

    if (!updatedCard) {
      throw createUpdateNotModifiedError(req, { entityName: "card" });
    }

    return res.status(200).json(updatedCard);
  };

  deleteCard = async (req, res) => {
    return this.delete(req, res, "deck", "card");
  };

  getCardById = async (req, res) => {
    return this.getByPk(req, res, "deck", "card");
  };

  updateCardDifficulties = async (req, res) => {
    /*     
        We receive from the client an object of updatedDifficulties in this format: 
        {
          cardId: matchingUpdatedDifficulty, 
          cardId: matchingUpdatedDifficulty, 
          cardId: matchingUpdatedDifficulty, 
          cardId: matchingUpdatedDifficulty
        } 
        As an example : {
          1: 2, 
          2: 8, 
          3: 16, 
          4: 32
        }
    */
    const updatedDifficulties = req.body;

    // If updatedDifficulties is not provided, or the object is empty, we return an error.
    if (!updatedDifficulties || Object.keys(updatedDifficulties).length === 0) {
      throw createMissingParamsError(req, {
        entityName: "card",
        params: ["updatedDifficulties"],
      });
    }

    // We initialize an array which will hold all updated Cards after the update in the DB.
    const updatedCards = [];

    // For each card id and its matching difficulty in the provided updatedDifficulties object...
    for (const [cardId, newDifficulty] of Object.entries(updatedDifficulties)) {
      // We find the matching card in the DB...
      const card = await this.datamapper.findByPk(cardId);

      if (!card) {
        throw createResourceNotFoundError(req, {
          entityName: "card",
          targetName: "card",
        });
      }

      // We set the matching card's difficulty to the updated difficulty & perform the update in the DB...
      card.difficulty = newDifficulty;

      const updatedCard = await this.datamapper.update(card);

      if (!updatedCard) {
        throw createFailedUpdateError(req, { entityName: "card" });
      }

      // And push each updated card to the previously initialized array...
      updatedCards.push(updatedCard);
    }

    // Which we then return to the client
    res.status(200).json(updatedCards);
  };
}
