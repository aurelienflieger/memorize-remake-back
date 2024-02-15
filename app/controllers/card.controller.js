import CoreController from "./core.controller.js";

export default class CardController extends CoreController {
  constructor(Datamapper) {
    super(Datamapper);

    this.datamapper = new Datamapper();
    this.getAllCardsByDeckID = this.getAllCardsByDeckID.bind(this);
    this.createNewCard = this.createNewCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.getByPk = this.getByPk.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAllCardsByDeckID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllCardsByDeckID(id);
    res.status(200).json(rows);
  }

  async createNewCard({ params, body }, res) {
    const { id } = params;
    const card = { ...body, deck_id: id };
    const row = await this.datamapper.insert(card);
    res.status(200).json(row);
  }

  async updateCard({ params, body }, res) {
    const { id } = params;
    let { front, back } = body;
    const data = await this.datamapper.findByPk(id);

    if (!data) {
      throw new Error("This card does not exist.")
    }

    front ? front : front = data.front;
    back ? back : back = data.back;

    const isModified = data.front === front && data.back === back;

    if (isModified) {
      throw new Error("You need to change at least one field");
    }

    const newCardInfo = { ...data, front: front, back: back };

    const row = await this.datamapper.update(newCardInfo);

    return res.status(200).json(row);
  }
}
