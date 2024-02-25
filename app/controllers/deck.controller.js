import CoreController from "./core.controller.js";
import { DeckDataMapper } from "../datamappers/index.datamapper.js";
import ApiError from "../errors/api.error.js";
import { createFailedCreationError, createMissingIdError, createResourceNotFoundError, createUpdateNotModifiedError } from "../errors/helpers.error.js";

export default class DeckController extends CoreController {
  constructor() {
    const datamapper = new DeckDataMapper();

    super(datamapper);

    this.datamapper = datamapper;
  }

  getAllDecksByUserID = async (req, res) => {
    const { id: userId } = req.params;

    if (!userId) {
      throw createMissingIdError(req, {entityName : "user"});
    }

    const decksMatchingUserId = await this.datamapper.findAllDecksByUserID(userId);

    if (!decksMatchingUserId) {
      throw new createResourceNotFoundError(req, {entityName: "user", targetName: "deck"});
    }

    res.status(200).json(decksMatchingUserId);
  };

  createNewDeck = async (req, res) => {
    const { id: userId } = req.params;

    if (!userId) {
      throw createMissingIdError(req, {entityName : "user"});
    }

    const deck = { ...req.body, user_id: userId };

    const createdDeck = await this.datamapper.insert(deck);

    if (!createdDeck) {
      throw createFailedCreationError(req, {entityName: "deck"});
    }

    res.status(200).json(createdDeck);
  };

  updateDeck = async (req, res) => {
    const { id: deckId } = req.params;
    let { name, description } = req.body;
    const deckMatchingId = await this.datamapper.findByPk(deckId);

    if (!deckMatchingId) {
      throw createResourceNotFoundError(req, {entityName: "deck", targetName: "deck"});
    }

    name ? name : name = deckMatchingId.name;
    description ? description : description = deckMatchingId.description;

    const isNotModified = deckMatchingId.name === name && deckMatchingId.description === description;

    if (isNotModified) {
      throw createUpdateNotModifiedError(req, {entityName: "deck"});
    }

    const newDeckInfo = { ...deckMatchingId, name: name, description: description };

    const updatedDeck = await this.datamapper.update(newDeckInfo);

    if (!updatedDeck) {
      throw createUpdateNotModifiedError(req, {entityName: "deck"});
    }

    return res.status(200).json(updatedDeck);
  };
}