import CoreController from "./core.controller.js";
import CardDataMapper from "../datamappers/index.datamapper.js";

/* The methods from the CoreDataMapper are available in addition to those specific to the Card. */
export default class CardController extends CoreController {
  constructor() {
    const datamapper = new CardDataMapper();

    super(datamapper);

    this.datamapper = datamapper;
  }

  getAllCardsByDeckID = async ({ params }, res) => {
    const { id } = params;
    const rows = await this.datamapper.findAllCardsByDeckID(id);
    res.status(200).json(rows);
  };

  createNewCard = async ({ params, body }, res) => {
    const { id } = params;
    const card = { ...body, deck_id: id };
    const row = await this.datamapper.insert(card);
    res.status(200).json(row);
  };

  updateCard = async ({ params, body }, res) => {
    const { id } = params;
    let { front, back } = body;
    const data = await this.datamapper.findByPk(id);

    if (!data) {
      throw new Error("This card does not exist.");
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
  };
}
