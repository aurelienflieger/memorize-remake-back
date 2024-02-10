import CoreController from "./core.controller.js";

export default class DeckController extends CoreController {
  constructor(datamapper) {
    super(datamapper);
  }

  async getAllDecksByUserID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllDecksByUserID(id);
    res.status(200).json(rows);
  }
}
