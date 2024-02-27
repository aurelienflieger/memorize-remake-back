import Joi from "joi";

export default Joi.object({
  "front": Joi.string().optional().allow("").messages({"string.base": "The front panel of the card must be of type 'text'" }),
  "back": Joi.string().optional().allow("").messages({"string.base": "The back panel of the card must be of type 'text'" }),
});