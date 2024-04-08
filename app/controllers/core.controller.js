import {
  createResourceNotFoundError,
  createMissingIdError,
  createAccountDeletionError,
} from '../errors/helpers.error.js'
import debugLogger from '../utils/debugLogger.util.js'

const logger = debugLogger('core.controller.js')

// The CoreController can be used to flexibly perform CRUD operations a database postgres table.
export default class CoreController {
  constructor(datamapper) {
    this.datamapper = datamapper
  }

  delete = async (req, res, entityName, targetName) => {
    let id

    try {
      id = Number(req.params.id)
    }
    catch {
      throw createMissingIdError(req, { entityName })
    }

    try {
      await this.datamapper.findByPk(id)
    }
    catch {
      throw new createResourceNotFoundError(req, { entityName, targetName })
    }

    try {
      await this.datamapper.delete(id)
    }
    catch {
      throw createAccountDeletionError(req)
    }

    logger('The entity was successfully deleted.')

    return res
      .status(204)
      .json({ message: `The ${entityName} was successfully deleted.` })
  }

  getByPk = async (req, res, entityName, targetName) => {
    let id, matchingId

    try {
      id = Number(req.params.id)
    }
    catch {
      throw createMissingIdError(req, { entityName })
    }

    try {
      matchingId = await this.datamapper.findByPk(id)
    }
    catch {
      throw new createResourceNotFoundError(req, { targetName })
    }

    logger(`The entity was successfully fetched from ID ${id}.`)

    return res.status(200).json(matchingId)
  }
}
