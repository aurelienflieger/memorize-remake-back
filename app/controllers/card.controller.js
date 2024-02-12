import CoreController from "./core.controller.js";

export default class CardController extends CoreController {
  constructor(Datamapper) {
    super(Datamapper);

    this.datamapper = new Datamapper();
    this.getAllCardsByDeckID = this.getAllCardsByDeckID.bind(this);
    this.create = this.create.bind(this);
    this.getByPk = this.getByPk.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async getAllCardsByDeckID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllCardsByDeckID(id);
    res.status(200).json(rows);
  }
  /* 
  async createNewCard(req, res) {
    const deckId = req.params.id;
    const { body } = req;
    const card = { ...body, deck_id: deckId };
    const row = await this.datamapper.insert(card);
    res.status(200).json(row);
  } */
}
