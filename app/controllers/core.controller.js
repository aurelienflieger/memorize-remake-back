// The CoreController can be used to flexibly perform CRUD operations a database postgres table.
export default class CoreController {
  constructor(datamapper) {
    this.datamapper = datamapper;
  }

  delete = async ({ params }, res) => {
    const { id } = params;
    const checkId = await this.datamapper.findByPk(id);

    if(!checkId) {
      throw new Error("The id you're looking for does not exist.");
    }
    
    const deleted = await this.datamapper.delete(id);
    return deleted
      ? res.status(400).json({
        message: "Deletion failed",
      })
      : res.status(202).json({ message: "Deletion success" });
  };

  getByPk = async ({ params }, res) => {
    const { id } = params;

    const row = await this.datamapper.findByPk(id);

    if (row === undefined) throw new Error("This id does not exists");

    return res.status(201).json(row);
  };
}
