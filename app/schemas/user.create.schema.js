import Joi from "joi";

export default Joi.object({
  username: Joi.string().max(15).messages({
    "string.base": "The username has to be of type TEXT.",
    "string.max": "The username has to be 15 characters or less.",
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).messages({
    "string.base": "The adress has to be of type TEXT.",
    "string.email": "Please enter a valid email address.",
  }),
  password: Joi.string()
    .pattern(new RegExp(/[ -~]*[a-z][ -~]*/)) // at least 1 lower-case
    .pattern(new RegExp(/[ -~]*[A-Z][ -~]*/)) // at least 1 upper-case
    .pattern(new RegExp(/[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/)) // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
    .pattern(new RegExp(/[ -~]*[0-9][ -~]*/)) // at least 1 number
    .min(8)
    .messages({
}).required();
