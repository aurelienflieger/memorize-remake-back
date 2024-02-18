import Joi from "joi";

export default Joi.object({
  username: Joi.string()
    .max(15)
    .messages({
      "string.base": "The username has to be of type TEXT.",
      "string.max": "The username has to be 15 characters or less."
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .messages({
      "string.base": "The adress has to be of type TEXT.",
      "string.email": "Please enter a valid email address."
    }
    ),
  password: Joi.string()
    .min(6)
    .messages({
      "string.min": "The password needs 6 characters or more."
    })
}).required();