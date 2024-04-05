import {
  createResourceNotFoundError,
  createMissingIdError,
  createAccountDeletionError,
} from "../errors/helpers.error.js";
import debugLogger from "../utils/debugLogger.util.js";

const logger = debugLogger('core.controller.js')

// The CoreController can be used to flexibly perform CRUD operations a database postgres table.
export default class CoreController {
  constructor(datamapper) {
    this.datamapper = datamapper;
  }

  delete = async (req, res, entityName, targetName) => {
    const { id } = req.params;

    if (!id) {
      throw createMissingIdError(req, { entityName });
    }

    const matchingId = await this.datamapper.findByPk(id);

    if (!matchingId) {
      throw new createResourceNotFoundError(req, { entityName, targetName });
    }

    const deleted = await this.datamapper.delete(id);

    if (!deleted) {
      throw createAccountDeletionError(req);
    }

    logger('The entity was successfully deleted.')

    return res
      .status(204)
      .json({ message: `The ${entityName} was successfully deleted.` });
  };

  getByPk = async (req, res, entityName, targetName) => {
    const { id } = req.params;

    if (!id) {
      throw createMissingIdError(req, { entityName });
    }

    const matchingId = await this.datamapper.findByPk(id);

    if (!matchingId) {
      throw new createResourceNotFoundError(req, { targetName });
    }

    logger('The entity was successfully fetched from an ID.')


    return res.status(200).json(matchingId);
  };
}
