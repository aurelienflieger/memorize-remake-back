import CoreDataMapper from "./core.datamapper.js";

export default class DeckDataMapper extends CoreDataMapper {
  readTableName = "deck";

  writeTableName = "deck";

  static async findAllDecksByUserID({ params }, res) {
    const { id } = params;
    const rows = await this.datamapper.findAllDecksByUserID(id);

    res.status(200).json(rows);
  }
}
