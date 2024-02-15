import Joi from "joi";

export default Joi.object({
  "front": Joi.string(),
  "back": Joi.string(),
  "difficulty": Joi.number().default(0).exist(),
  "deck_id": Joi.number().exist(),
});