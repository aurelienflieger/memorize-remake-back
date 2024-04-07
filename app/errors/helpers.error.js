import ApiError from './api.error.js'

function createMissingIdError({ path, method }, { entityName }) {
  return new ApiError(`L'ID de ${entityName} n'a pas été fourni`, {
    httpStatus: 400,
    errorCode: 'MISSING_ID',
    path: path,
    method: method,
    details: `L'ID de ${entityName} doit être fourni au serveur. Veuillez fournir un paramètre 'id' pour traiter votre demande.`,
  })
}

function createMissingParamsError({ path, method }, { entityName, params }) {
  return new ApiError(
    `Les paramètres suivants de ${entityName} n'ont pas été fournis : ${[...params]}`,
    {
      httpStatus: 400,
      errorCode: 'MISSING_PARAMETER',
      path: path,
      method: method,
      details: `Les paramètres de ${entityName} ${[
        ...params,
      ]} doivent être fournis au serveur. Veuillez les fournir pour traiter votre demande.`,
    },
  )
}

function createResourceNotFoundError(
  { path, method },
  { entityName, targetName },
) {
  return new ApiError(
    `L'ID de ${entityName} fourni ne correspond à aucun ${targetName}.`,
    {
      httpStatus: 404,
      errorCode: 'RESOURCE_NOT_FOUND',
      path: path,
      method: method,
      details: `L'ID ${entityName} fourni au serveur ne correspond à aucun(e) ${targetName}. Veuillez fournir un 'id' ${entityName} existant pour traiter votre demande.`,
    },
  )
}

function createFailedCreationError({ path, method }, { entityName }) {
  console.log(path, method)
  return new ApiError(
    `Un nouveau ${entityName} n'a pas pu être créé avec succès.`,
    {
      httpStatus: 500,
      errorCode: 'CREATION_FAILED',
      path: path,
      method: method,
      details: `Votre demande de création de ${entityName} n'a pas pu être traitée. Un ${entityName} identique existe-t-il déjà ?`,
    },
  )
}

function createFailedUpdateError({ path, method }, { entityName }) {
  return new ApiError(`Votre ${entityName} n'a pas pu être mis à jour avec succès.`, {
    httpStatus: 500,
    errorCode: 'UPDATE_FAILED',
    path: path,
    method: method,
    details: `Votre demande de mise à jour de ${entityName} semble être valide mais le processus a été interrompu.`,
  })
}

function createUpdateNotModifiedError({ path, method }, { entityName }) {
  return new ApiError(
    `Vous n'avez pas mis à jour aucun des champs de ${entityName} que vous souhaitez mettre à jour.`,
    {
      httpStatus: 409,
      errorCode: 'UPDATE_FAILED_IDENTICAL_INPUT',
      path: path,
      method: method,
      details: `Vous ne pouvez pas mettre à jour un ${entityName} si tous les champs sont identiques. Veuillez mettre à jour au moins un champ.`,
    },
  )
}

function createIncorrectPasswordError({ path, method }) {
  return new ApiError('Le mot de passe fourni est incorrect.', {
    httpStatus: 401,
    errorCode: 'INCORRECT_PASSWORD',
    path,
    method,
    details:
      'Un mot de passe valide doit être fourni au serveur. Veuillez vérifier votre mot de passe pour traiter votre demande de connexion.',
  })
}

function createTokenGenerationError({ path, method }) {
  return new ApiError('Les jetons d\'authentification n\'ont pas pu être générés.', {
    httpStatus: 500,
    errorCode: 'TOKEN_GENERATION_FAILED',
    path,
    method,
    details:
      'Les jetons d\'accès et de rafraîchissement n\'ont pas pu être générés bien que les informations fournies étaient valides. Il s\'agit d\'une erreur interne du serveur.',
  })
}

function createPasswordEncryptionError({ path, method }) {
  return new ApiError('Le mot de passe n\'a pas pu être crypté.', {
    httpStatus: 500,
    errorCode: 'EPASSWORD_ENCRYPTION_FAILED',
    path,
    method,
    details:
      'Le mot de passe n\'a pas pu être crypté bien que les informations fournies étaient valides. Il s\'agit d\'une erreur interne du serveur.',
  })
}

function createAccountCreationError({ method, path }) {
  return new ApiError(
    `Un nouveau compte n'a pas pu être créé avec succès.`,
    {
      httpStatus: 400,
      errorCode: 'USER_CREATION_FAILED',
      method,
      path,
      details: `Votre demande de création de compte n'a pas pu être traitée. Un compte identique existe-t-il déjà ?`,
    },
  )
}

function createAccountDeletionError({ path, method }) {
  return new ApiError('Le compte utilisateur n\'a pas pu être supprimé avec succès.', {
    httpStatus: 500,
    errorCode: 'USER_DELETION_FAILED',
    path,
    method,
    details:
      'L\'id utilisateur fourni au serveur correspond à un compte utilisateur mais la suppression n\'a pas pu être effectuée.',
  })
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
  createAccountDeletionError,
  createAccountCreationError,
}
