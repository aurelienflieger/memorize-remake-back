import CoreController from "./core.controller.js";

export default class CardController extends CoreController {
  constructor(Datamapper) {
    super(Datamapper);

    this.datamapper = new Datamapper();
    this.getAllCardsByDeckID = this.getAllCardsByDeckID.bind(this);
    this.createNewCard = this.createNewCard.bind(this);
    this.getByPk = this.getByPk.bind(this);
    this.delete = this.delete.bind(this);
    this.updateCard = this.updateCard.bind(this);
  }

  async getAllCardsByDeckID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllCardsByDeckID(id);
    res.status(200).json(rows);
  }

  async createNewCard(req, res) {
    const deckId = req.params.id;
    const { body } = req;
    const card = { ...body, deck_id: deckId };
    const row = await this.datamapper.insert(card);
    res.status(200).json(row);
  }

  async updateCard({ params, body }, res) {
    const { id } = params;
    const { front, back } = body;
    const data = await this.datamapper.findByPk(id);

    const isModified = data.front !== front || data.back !== back;

    if (!isModified) {
      throw new Error("You need to change at least one field");
    }

    const newCardInfo = { ...data, front: front, back: back };
    console.log(newCardInfo);

    const row = await this.datamapper.update(newCardInfo);

    return res.status(200).json(row);
  }
}
