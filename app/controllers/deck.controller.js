import CoreController from "./core.controller.js";
import { DeckDataMapper } from "../datamappers/index.datamapper.js";

export default class DeckController extends CoreController {
  datamapper = new DeckDataMapper();

  async getAllDecksByUserID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllDecksByUserID(id);
    res.status(200).json(rows);
  }
}
