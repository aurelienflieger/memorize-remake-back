import bcrypt from "bcrypt";
import CoreController from "./core.controller.js";
import generateJWT from "../utils/generateJWT.util.js";

class UserController extends CoreController {
  constructor(Datamapper) {
    super(Datamapper);

    this.datamapper = new Datamapper();
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.getByPk = this.getByPk.bind(this);
    this.delete = this.delete.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
  }

  async login(req, res) {
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
  }

  async signup(req, res) {
    const { password, username, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({ newUser });
  }

  async updateAccount({ params, body }, res) {
    const { id } = params;
    const { username, email } = body;
    const data = await this.datamapper.findByPk(id);

    /* const validPassword = await bcrypt.compare(password, data.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    const test = await bcrypt.compare(newPassword, data.password);
    console.log(test);

    console.log(data.password);
    console.log(newHashedPassword);
    */

    const isModified = data.username !== username || data.email !== email;

    if (!isModified) {
      throw new Error("You need to change at least one field");
    }

    const newAccountInfo = { ...data, email: body.email, username: body.username };
    console.log(newAccountInfo);

    const row = await this.datamapper.update(newAccountInfo);

    return res.status(200).json(row);
  }
}

export default UserController;
