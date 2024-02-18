import Joi from "joi";

export default Joi.object({
  password: Joi.string()
    .messages({
      "string.base": "The password has to be of type TEXT.",
    }),
  newPassword: Joi.string()
    .min(6)
    .messages({
      "string.base": "The new password has to be of type TEXT.",
      "string.min": "The new password needs 6 characters or more."
    }),
}).required();