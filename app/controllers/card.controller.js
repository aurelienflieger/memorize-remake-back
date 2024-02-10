import CardDataMapper from "../datamappers/card.datamapper.js";
import CoreController from "./core.controller.js";

export default class CardController extends CoreController {
  datamapper = CardDataMapper;

  async getAllCardsByDeckID({ params }, res, next) {
    const { deckId } = params;
    const rows = await this.datamapper.findAllCardsByDeckID(deckId);
    if (!rows) {
      return next();
    }
    res.status(200).json(rows);
  }
}
