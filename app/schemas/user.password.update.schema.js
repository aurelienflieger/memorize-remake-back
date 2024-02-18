import Joi from "joi";

export default Joi.object({
  password: Joi.string().messages({
    "string.base": "The password has to be of type TEXT.",
  }),
  newPassword: Joi.string()
    .pattern(new RegExp(/[ -~]*[a-z][ -~]*/)) // at least 1 lower-case
    .pattern(new RegExp(/[ -~]*[A-Z][ -~]*/)) // at least 1 upper-case
    .pattern(new RegExp(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/)) // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
    .pattern(new RegExp(/[ -~]*[0-9][ -~]*/)) // at least 1 number
    .min(8)
    .messages({
      "string.base": "The password has to be of type TEXT",
      "string.min": "The password should contain at least 8 characters.",
      "string.pattern": "Wrong pattern",
    }),
}).required();
