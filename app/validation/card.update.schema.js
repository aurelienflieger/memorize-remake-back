import Joi from "joi";

export default Joi.object({
  "front": Joi.string(),
  "back": Joi.string(),
});