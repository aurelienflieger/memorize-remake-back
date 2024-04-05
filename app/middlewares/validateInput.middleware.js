import ApiError from '../errors/api.error.js'

function validateInput(sourceProperty, schema) {
  return async function (request, _, next) {
    try {
      await schema.validateAsync(request[sourceProperty])
      next()
    }
    catch (error) {
      next(new ApiError(error.details[0].message, { httpStatus: 400 }))
    }
  }
}

export default validateInput
