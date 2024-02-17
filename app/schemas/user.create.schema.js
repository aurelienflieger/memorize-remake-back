import Joi from "joi";

export default Joi.object({
  username: Joi.string()
    .max(15)
    .messages({
      "string.base": "The username has to be of type \"text\"",
      "string.max": "The username has to be 15 characters or less."
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({
      "string.base": "The adress has to be of type \"text\"",
      "string.email": "Please enter a valid email address."
    }
    ),
  password: Joi.string()
}).required();