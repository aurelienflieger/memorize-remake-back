import ApiError from "./api.error.js";

function createMissingIdError({ path, method }, { entityName }) {
  return new ApiError(`The ${entityName} ID was not provided`, {
    httpStatus: 400,
    errorCode: "MISSING_PARAMETER",
    path: path,
    method: method,
    details: `The ${entityName} ID must be provided to the server.  Please provide an 'id' parameter to process your request.`,
  });
}

function createMissingParamsError({ path, method }, { entityName, params }) {
  return new ApiError(
    `The following ${entityName} parameters were not provided: ${[...params]}`,
    {
      httpStatus: 400,
      errorCode: "MISSING_PARAMETER",
      path: path,
      method: method,
      details: `The ${entityName} parameters ${[
        ...params,
      ]} must be provided to the server.  Please provide them to process your request.`,
    }
  );
}

function createResourceNotFoundError(
  { path, method },
  { entityName, targetName }
) {
  return new ApiError(
    `The provided ${entityName} ID does not match any ${targetName}.`,
    {
      httpStatus: 404,
      errorCode: "RESOURCE_NOT_FOUND",
      path: path,
      method: method,
      details: `The ${entityName} ID provided to the server does not match any ${targetName}.  Please provide an existing ${entityName} 'id' parameter to process your request.`,
    }
  );
}

function createFailedCreationError({ path, method }, { entityName }) {
  return new ApiError(
    `A new ${entityName} could not be successfully created.`,
    {
      httpStatus: 500,
      errorCode: "CREATION_FAILED",
      path: path,
      method: method,
      details: `Your ${entityName} creation request seems to be valid but the process was aborted.`,
    }
  );
}

function createFailedUpdateError({ path, method }, { entityName }) {
  return new ApiError(`Your ${entityName} could not be successfully updated.`, {
    httpStatus: 500,
    errorCode: "UPDATE_FAILED",
    path: path,
    method: method,
    details: `Your ${entityName} update request seems to be valid but the process was aborted.`,
  });
}

function createUpdateNotModifiedError({ path, method }, { entityName }) {
  return new ApiError(
    `You did not update any of the fields of the ${entityName} you wish to update.`,
    {
      httpStatus: 409,
      errorCode: "UPDATE_IDENTICAL",
      path: path,
      method: method,
      details: `You cannot update a ${entityName} if all fields are identical.  Please update at least one field.`,
    }
  );
}

function createIncorrectPasswordError({ path, method }) {
  return new ApiError("The password provided is incorrect.", {
    httpStatus: 401,
    errorCode: "INCORRECT_PASSWORD",
    path,
    method,
    details:
      "A valid password must be provided to the server.  Please check your password to process your login request.",
  });
}

function createTokenGenerationError({ path, method }) {
  return new ApiError("The authentication tokens could not be generated.", {
    httpStatus: 500,
    errorCode: "TOKENS_ERROR",
    path,
    method,
    details:
      "The access & refresh tokens failed to generate although the information provided was valid. This is an internal server error.",
  });
}

function createPasswordEncryptionError({ path, method }) {
  return new ApiError("The password could not be encrypted.", {
    httpStatus: 500,
    errorCode: "ENCRYPTION_FAILED",
    path,
    method,
    details:
      "The password could not be encrypted although the information provided was valid. This is an internal server error.",
  });
}

function createAccountDeletionError({ path, method }) {
  return new ApiError("The user account could not be successfully deleted.", {
    httpStatus: 500,
    errorCode: "USER_DELETION_FAILED",
    path,
    method,
    details:
      "The user id provided to the server matched an user account but the deletion could not be performed.",
  });
}

export {
  createMissingIdError,
  createMissingParamsError,
  createResourceNotFoundError,
  createFailedCreationError,
  createUpdateNotModifiedError,
  createFailedUpdateError,
  createIncorrectPasswordError,
  createTokenGenerationError,
  createPasswordEncryptionError,
  createAccountDeletionError
};
