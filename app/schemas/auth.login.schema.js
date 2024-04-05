import Joi from 'joi'

export default Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).messages({
    'string.base': 'The adress has to be of type TEXT.',
    'string.email': 'Please enter a valid email address.',
  }),
  password: Joi.string().min(8).messages({
    'string.base': 'The password has to be of type TEXT.',
    'string.min': 'The password should contain at least 8 characters.',
  }),
}).required()
