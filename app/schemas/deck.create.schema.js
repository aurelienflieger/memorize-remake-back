import Joi from "joi";

export default Joi.object({
  name: Joi.string().messages({
    "string.base": "The deck's name must be of type 'text'",
  }),
  description: Joi.string().messages({
    "string.base": "The deck's description must be of type 'text'",
  }),
});
