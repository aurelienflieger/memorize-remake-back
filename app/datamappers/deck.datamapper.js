import deckDatamapper from "../datamappers/index.datamapper.js";
import CoreController from "./core.controller.js";

export default class DeckDataMapper extends CoreController {
  datamapper = deckDatamapper;

  static async findAllDecksByUserID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllDecksByUserID(id);

    res.status(200).json(rows);
  }
}
