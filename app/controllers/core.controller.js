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
    console.log(body);

    const data = { ...dbData, ...body };

    const row = await this.datamapper.update(data);

    return res.status(200).json(row);
  }

  async delete({ params }, res) {
    const { id } = params;
    const checkId = await this.datamapper.findByPk(id);

    if(!checkId) {
      throw new Error("The id you're looking for does not exist.")
    }
    
    const deleted = await this.datamapper.delete(id);
    return deleted
      ? res.status(400).json({
          message: "Deletion failed",
        })
      : res.status(202).json({ message: "Deletion success" });
  }

  async getByPk({ params }, res) {
    const { id } = params;

    const row = await this.datamapper.findByPk(id);

    if (row === undefined) throw new Error();

    return res.status(201).json(row);
  }
}
