import CoreController from "./core.controller.js";
import {DeckDataMapper} from "../datamappers/index.datamapper.js";

export default class DeckController extends CoreController {
  constructor() {
    const datamapper = new DeckDataMapper();

    super(datamapper);

    this.datamapper = datamapper;
  }

  getAllDecksByUserID = async ({ params }, res) => {
    const { id } = params;
    const rows = await this.datamapper.findAllDecksByUserID(id);
    res.status(200).json(rows);
  };

  createNewDeck = async ({ params, body }, res) => {
    const { id } = params;
    const deck = { ...body, user_id: id };

    const row = await this.datamapper.insert(deck);
    res.status(200).json(row);
  };

  updateDeck = async ({ params, body }, res) => {
    const { id } = params;
    let { name, description } = body;
    const data = await this.datamapper.findByPk(id);

    if (!data) {
      throw new Error("This deck does not exist.");
    }

    name ? name : name = data.name;
    description ? description : description = data.description;

    const isModified = data.name === name && data.description === description;

    if (isModified) {
      throw new Error("You need to change at least one field");
    }

    const newDeckInfo = { ...data, name: name, description: description };

    const row = await this.datamapper.update(newDeckInfo);

    return res.status(200).json(row);
  };
}
