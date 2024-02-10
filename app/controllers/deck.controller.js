import CoreController from "./core.controller.js";

export default class DeckController extends CoreController {
  constructor(Datamapper) {
    super(Datamapper);
    this.datamapper = new Datamapper();
    this.getAllDecksByUserID = this.getAllDecksByUserID.bind(this);
    this.getByPk = this.getByPk.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async getAllDecksByUserID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllDecksByUserID(id);
    res.status(200).json(rows);
  }
}
