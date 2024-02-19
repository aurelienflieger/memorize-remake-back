import CardController from "./card.controller.js";
import DeckController from "./deck.controller.js";
import UserController from "./user.controller.js";

const userController = new UserController();
const deckController = new DeckController();
const cardController = new CardController();

export { 
  cardController, 
  deckController, 
  userController 
};
