// The CoreController can be used to flexibly perform CRUD operations a database postgres table.
export default class CoreController {
  constructor(Datamapper) {
    this.datamapper = new Datamapper();
  }

  async create(creationDetails) {
    const row = await this.datamapper.insert(creationDetails);

    return row;
  }

  async update({ params, body }, res) {
    const { id } = params;

    const dbData = await this.datamapper.findByPk(id);

    const data = { ...dbData, ...body };

    const row = await this.datamapper.update(data);

    return res.status(200).json(row);
  }

  async delete({ params }, res) {
    const { id } = params;

    await this.datamapper.delete(id);

    return res.status(204).json();
  }

  async getByPk({ params }, res) {
    const { id } = params;

    const row = await this.datamapper.findByPk(id);

    return res.status(200).json(row);
  }
}
