import bcrypt from "bcrypt";
import generateJWT from "../utils/generateJWT.util.js";
import CoreController from "./core.controller.js";
import { UserDataMapper } from "../datamappers/index.datamapper.js";

class UserController extends CoreController {
  constructor() {
    const datamapper = new UserDataMapper();

    super(datamapper);

    this.datamapper = datamapper;
  }

  login = async (req, res) => {
    const { email: inputEmail, password: inputPassword } = req.body;

    const user = await this.datamapper.getUserByEmail(inputEmail);

    if (!user) {
      return res.status(401).json({ error: "Please verify the input email." });
    }

    const validPassword = await bcrypt.compare(inputPassword, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const tokens = generateJWT(user);

    const { email, username, id } = user;

    const tokensWithUser = {
      ...tokens,
      email,
      username,
      id,
    };

    // Both the access token & the refresh token are returned in JSON format for front-end authentification
    res.status(200).json(tokensWithUser);
  };

  signup = async (req, res) => {
    const { password, username, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.datamapper.insert({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({ newUser });
  };

  updateAccountInfo = async ({ params, body }, res) => {
    const { id } = params;
    let { username, email } = body;
    const data = await this.datamapper.findByPk(id);

    if (!data) {
      throw new Error("This account does not exist.");
    }

    username ? username : (username = data.username);
    email ? email : (email = data.email);

    const isModified = data.username === username && data.email === email;

    if (isModified) {
      throw new Error("You need to change at least one field");
    }

    const newAccountInfo = { ...data, email: email, username: username };

    const row = await this.datamapper.update(newAccountInfo);

    return res.status(200).json(row);
  };

  updateAccountPassword = async ({ params, body }, res) => {
    const { id } = params;
    let { password, newPassword } = body;
    const data = await this.datamapper.findByPk(id);

    if (!data) {
      throw new Error("This account does not exist.");
    }

    const validPassword = await bcrypt.compare(password, data.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const comparePasswords = await bcrypt.compare(newPassword, data.password);

    if (comparePasswords) {
      throw new Error(
        "Your current password and the new one must be different."
      );
    }

    const newAccountPassword = { ...data, password: newHashedPassword };

    const row = await this.datamapper.update(newAccountPassword);

    return res.status(200).json(row);
  };

  updateAccountPassword = async ({ params, body }, res) => {
    const { id } = params;
    let { password, newPassword } = body;
    const data = await this.datamapper.findByPk(id);

    if (!data) {
      throw new Error("This account does not exist.");
    }

    const validPassword = await bcrypt.compare(password, data.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const comparePasswords = await bcrypt.compare(newPassword, data.password);

    if (comparePasswords) {
      throw new Error(
        "Your current password and the new one must be different."
      );
    }

    const newAccountPassword = { ...data, password: newHashedPassword };

    const row = await this.datamapper.update(newAccountPassword);

    return res.status(200).json(row);
  };

  getByPk = async ({ params }, res) => {
    const { id } = params;

    const row = await this.datamapper.findByPkWithNoReturnedPassword(id);

    if (row === undefined) throw new Error("This id does not exists");

    return res.status(201).json(row);
  };
}

export default UserController;
