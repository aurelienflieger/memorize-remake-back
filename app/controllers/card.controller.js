import CoreController from "./core.controller.js";

export default class CardController extends CoreController {
  constructor(Datamapper) {
    super(Datamapper);
    this.datamapper = new Datamapper();
    this.getAllCardsByDeckID = this.getAllCardsByDeckID.bind(this);
    this.getByPk = this.getByPk.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async getAllCardsByDeckID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllCardsByDeckID(id);
    res.status(200).json(rows);
  }
}
