// The CoreController can be used to flexibly perform CRUD operations a database postgres table.
export default class CoreController {
  datamapper;

  async create({ body }, res) {
    const row = await CoreController.datamapper.insert(body);

    res.status(200).json(row);
  }

  async update({ params, body }, res, next) {
    const { id } = params;

    const dbData = await CoreController.datamapper.findByPk(id);

    if (!dbData) {
      return next();
    }

    const data = { ...dbData, ...body };

    const row = await CoreController.datamapper.update(data);

    if (!row) {
      return next();
    }

    return res.status(200).json(row);
  }

  async delete({ params }, res, next) {
    const { id } = params;

    const deleted = await CoreController.datamapper.delete(id);

    if (!deleted) {
      return next();
    }

    return res.status(204).json();
  }

  async getByPk({ params }, res, next) {
    const { id } = params;

    const row = await CoreController.datamapper.findByPk(id);

    if (!row) {
      return next();
    }

    return res.status(200).json(row);
  }
}
