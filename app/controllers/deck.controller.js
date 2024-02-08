import DeckDatamapper from "../datamappers/deck.datamapper.js";
import CoreController from "./core.controller.js";

export default class DeckController extends CoreController {
  static datamapper = DeckDatamapper;

  static async getAllDecksByUserID({ params }, res, next) {
    const { userid } = params;
    const rows = await this.datamapper.findAllDecksByUserID(userid);
    if(!rows) {
      return next();
    }
    res.status(200).json(rows);
  }
}