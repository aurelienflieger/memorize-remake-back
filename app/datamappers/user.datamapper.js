import CoreDatamapper from "./core.datamapper.js";

/* The methods from the CoreDataMapper are available in addition to those specific to the User. */
export default class UserDataMapper extends CoreDatamapper {
  static readTableName = "user";

  static writeTableName = "user";
}
