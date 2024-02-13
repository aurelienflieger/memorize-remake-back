import CoreController from "./core.controller.js";

export default class DeckController extends CoreController {
  constructor(Datamapper) {
    super(Datamapper);

    this.datamapper = new Datamapper();
    this.getAllDecksByUserID = this.getAllDecksByUserID.bind(this);
    this.createNewDeck = this.createNewDeck.bind(this);
    this.getByPk = this.getByPk.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async getAllDecksByUserID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllDecksByUserID(id);
    res.status(200).json(rows);
  }

  /* async createDeck({ body }, res) {
    const { name, description, user_id } = body;

    const newDeck = await this.create({
      name,
      description,
      user_id,
    });

    res.status(201).json({ newDeck });
  } */

  async createNewDeck(req, res) {
    const userId = req.params.id;
    const { body } = req;

    const deck = { ...body, user_id: userId };
    const row = await this.datamapper.insert(deck);
    console.log(row);

    res.status(200).json(row);
  }
}
