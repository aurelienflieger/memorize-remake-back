import ApiError from "./api.error";

function createMissingIdError({path, method}, {entityName}) {
  return new ApiError(
    `The ${entityName} ID was not provided`, 
    {
      httpStatus: 400, 
      errorCode: "MISSING_PARAMETER", 
      path: path, 
      method: method, 
      details: `The ${entityName} id must be provided to the server. \n Please provide an 'id' parameter to process your request.`
    }
  );
}

function createResourceNotFoundError({path, method}, {entityName, targetName}) {
  return new ApiError(
    `The provided ${entityName} ID does not match any ${targetName}.`, {httpStatus: 404, errorCode: "ACCOUNT_NOT_FOUND", path: path, method: method, details: `The ${entityName} ID provided to the server does not match any ${targetName}. \n Please provide an existing ${entityName} 'id' parameter to process your request.`}
  );
}

export {createMissingIdError, createResourceNotFoundError};