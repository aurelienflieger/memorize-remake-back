import Joi from "joi";

export default Joi.object({
  username: Joi.string().optional().allow("").max(15).messages({
    "string.base": "The username has to be of type TEXT.",
    "string.max": "The username has to be 15 characters or less.",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .optional()
    .allow("")
    .messages({
      "string.email": "Please enter a valid email address.",
    }),
}).min(1);
