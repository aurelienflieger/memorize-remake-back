import {
  UserDataMapper,
  DeckDataMapper,
  CardDataMapper,
} from "../datamappers/index.datamapper.js";
import CardController from "./card.controller.js";
import DeckController from "./deck.controller.js";
import UserController from "./user.controller.js";

const userController = new UserController(UserDataMapper);
const deckController = new DeckController(DeckDataMapper);
const cardController = new CardController(CardDataMapper);

export { cardController, deckController, userController };
