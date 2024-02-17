import ApiError from '../errors/api.error.js';

export default (sourceProperty, schema) => async (request, _, next) => {
  try {
    await schema.validateAsync(request[sourceProperty]);
    next();
  } catch (error) {
    next(new ApiError(error.details[0].message, { httpStatus: 400 }));
  }
};
