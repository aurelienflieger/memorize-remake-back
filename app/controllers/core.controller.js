import { createResourceNotFoundError, createMissingIdError, createAccountDeletionError } from "../errors/helpers.error.js";

// The CoreController can be used to flexibly perform CRUD operations a database postgres table.
export default class CoreController {
  constructor(datamapper) {
    this.datamapper = datamapper;
  }

  delete = async (req, res, entityName, targetName) => {
    const { id } = req.params;

    if (!id) {
      throw createMissingIdError(req, {entityName});
    }

    const userMatchingId = await this.datamapper.findByPk(id);

    if (!userMatchingId) {
      throw new createResourceNotFoundError(req, {entityName, targetName} );
    }

    const deleted = await this.datamapper.delete(id);

    if (!deleted) {
      throw createAccountDeletionError(req);
    }
    return res.status(204).json({ message: "The user account was successfully deleted." });
  };

  getByPk = async (req, res, entityName, targetName) => {
    const { id } = req.params;

    if (!id) {
      throw createMissingIdError(req, {entityName});
    }

    const userMatchingId = await this.datamapper.findByPk(id);

    if (!userMatchingId) {
      throw new createResourceNotFoundError(req, {targetName});
    }

    return res.status(200).json(userMatchingId);
  };
}
