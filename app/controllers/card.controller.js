import CoreController from "./core.controller.js";
import {CardDataMapper} from "../datamappers/index.datamapper.js";
import ApiError from "../errors/api.error.js";
import { createMissingIdError, createResourceNotFoundError } from "../errors/helpers.error.js";

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

  createNewCard = async ({ params, body }, res) => {
    const { id } = params;
    const card = { ...body, deck_id: id };
    const row = await this.datamapper.insert(card);
    res.status(200).json(row);
  };

  updateCard = async ({ params, body }, res) => {
    const { id } = params;
    let { front, back } = body;
    const data = await this.datamapper.findByPk(id);

    if (!data) {
      throw new ApiError("This card does not exist.", { httpStatus: 404 });
    }

    front ? front : front = data.front;
    back ? back : back = data.back;

    const isModified = data.front === front && data.back === back;

    if (isModified) {
      throw new ApiError("You need to change at least one field", { httpStatus: 400 });
    }

    const newCardInfo = { ...data, front: front, back: back };

    const row = await this.datamapper.update(newCardInfo);

    return res.status(200).json(row);
  };
}
