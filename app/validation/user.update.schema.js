import Joi from "joi";

export default Joi.object({
  username: Joi.string()
    .max(15)
    .messages({
      'string.base': 'The username has to be of type "text"',
      'string.max': 'The username has to be 15 characters or less.'
    }),
  email: Joi.email({ minDomainSegments: 2 })
    .messages({
      'string.email': 'Please enter a valid email address.'
  }),
  password: Joi.string()
    .when('newPassword', {
      is: Joi.exist(),
      then: Joi.required()
    }
  ),
  newPassword: Joi.string()
    .when('password', {
      is: Joi.exist(),
      then: Joi.required()
    }
  )
}).min(1);