import CoreController from "./core.controller.js";

export default class CardController extends CoreController {
  constructor(datamapper) {
    super(datamapper);
  }

  async getAllCardsByDeckID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllCardsByDeckID(id);
    res.status(200).json(rows);
  }
}
