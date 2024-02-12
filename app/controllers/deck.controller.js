import CoreController from "./core.controller.js";

export default class DeckController extends CoreController {
  constructor(Datamapper) {
    super(Datamapper);

    this.datamapper = new Datamapper();
    this.getAllDecksByUserID = this.getAllDecksByUserID.bind(this);
    this.create = this.create.bind(this);
    this.getByPk = this.getByPk.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async getAllDecksByUserID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllDecksByUserID(id);
    res.status(200).json(rows);
  }

  /*   async createNewDeck(req, res) {
    const userId = req.params.id;
    const { body } = req;
    const deck = { ...body, user_id: userId };
    const row = await this.datamapper.insert(deck);
    res.status(200).json(row);
  } */
}
