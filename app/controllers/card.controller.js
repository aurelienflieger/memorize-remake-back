import CoreController from "./core.controller.js";
import { CardDataMapper } from "../datamappers/index.datamapper.js";
import ApiError from "../errors/api.error.js";
import debugLogger from "./app/utils/debugLogger.util.js";

/* The methods from the CoreDataMapper are available in addition to those specific to the Card. */
export default class CardController extends CoreController {
  constructor() {
    const datamapper = new CardDataMapper();

    super(datamapper);

    const logger = debugLogger("card.controller.js");

    this.logger = logger;

    this.datamapper = datamapper;
  }

  getAllCardsByDeckID = async ({ params }, res, next) => {
    try {
      const { id } = params;
      const rows = await this.datamapper.findAllCardsByDeckID(id);
      res.status(200).json(rows);
    } catch (error) {
      this.logger(
        `getAllCardsByDeckID: there was an error getting the cards. The following error occured: \n ${error.message}`
      );
      next(error);
    }
  };

  createNewCard = async ({ params, body }, res, next) => {
    try {
      const { id } = params;
      const card = { ...body, deck_id: id };
      const row = await this.datamapper.insert(card);
      res.status(200).json(row);
    } catch (error) {
      this.logger(
        `createNewCard: there was an error creating a new card. The following error occured: \n ${error.message}`
      );
      next(error);
    }
  };

  updateCard = async ({ params, body }, res, next) => {
    try {
      const { id } = params;
      let { front, back } = body;
      const data = await this.datamapper.findByPk(id);

      if (!data) {
        throw new ApiError("This card does not exist.", { httpStatus: 404 });
      }

      front ? front : (front = data.front);
      back ? back : (back = data.back);

      const isModified = data.front === front && data.back === back;

      if (isModified) {
        throw new ApiError("You need to change at least one field", {
          httpStatus: 400,
        });
      }

      const newCardInfo = { ...data, front: front, back: back };

      const row = await this.datamapper.update(newCardInfo);

      return res.status(200).json(row);
    } catch (error) {
      this.logger(
        `updateCard: there was an error updating an existing card. The following error occured: \n ${error.message}`
      );
      next(error);
    }
  };
}
