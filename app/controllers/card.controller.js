import CoreController from "./core.controller.js";
import { CardDataMapper } from "../datamappers/index.datamapper.js";

export default class CardController extends CoreController {
  datamapper = new CardDataMapper();

  async getAllCardsByDeckID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllCardsByDeckID(id);
    res.status(200).json(rows);
  }
}
