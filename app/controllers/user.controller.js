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
    let { username, email, password, newPassword } = body;
    const data = await this.datamapper.findByPk(id);

    if (!data) {
      throw new Error("This account does not exist.")
    }

    username ? username : username = data.username;
    email ? email : email = data.email;

    /*
    password ? password : password = data.password;
    newPassword ? password : newPassword = data.password;

    const validPassword = await bcrypt.compare(password, data.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(newHashedPassword);

    const comparePasswords = await bcrypt.compare(newPassword, data.password);

    if (comparePasswords) {
      throw new Error("Your current password and the new one must be different.")
    }
    */
    const isModified = data.username === username && data.email === email;

    if (isModified) {
      throw new Error("You need to change at least one field");
    }

    const newAccountInfo = { ...data, email: email, username: username};

    const row = await this.datamapper.update(newAccountInfo);

    return res.status(200).json(row);
  }

  async getByPk({ params }, res) {
    const { id } = params;

    const row = await this.datamapper.findByPk(id);

    if (row === undefined) throw new Error("This user does not exists.");

    return res.status(201).json(row);
  }
}

export default UserController;
