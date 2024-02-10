import CardDataMapper from "./card.datamapper";
import DeckDataMapper from "./deck.datamapper";
import UserDataMapper from "./user.datamapper";

const cardDataMapper = new CardDataMapper();
const deckDataMapper = new DeckDataMapper();
const userDataMapper = new UserDataMapper();

export default { cardDataMapper, deckDataMapper, userDataMapper };
