import ApiError from "./api.error";

function createMissingIdError({path, method}) {
  return new ApiError(
    "The user ID was not provided", 
    {
      httpStatus: 400, 
      errorCode: "MISSING_PARAMETER", 
      path: path, 
      method: method, 
      details: "The user id must be provided to the server. \n Please provide an 'id' parameter to process your request."
    }
  );
}

function createAccountNotFoundError({path, method}) {
  return new ApiError(
    "The provided user ID does not match any account.", {httpStatus: 404, errorCode: "ACCOUNT_NOT_FOUND", path: path, method: method, details: "The user id provided to the server does not match any user account. \n Please provide a 'id' parameter matching an actual user ID to process your request."}
  );
}

export {createMissingIdError, createAccountNotFoundError};