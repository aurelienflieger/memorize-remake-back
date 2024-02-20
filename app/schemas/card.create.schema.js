import Joi from "joi";

export default Joi.object({
  front: Joi.string().messages({
    "string.base": 'The front panel of the card must be of type "text"',
  }),
  back: Joi.string().messages({
    "string.base": 'The back panel of the card must be of type "text"',
  }),
});
