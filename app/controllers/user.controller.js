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
    this.update = this.update.bind(this);
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await this.datamapper.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: "Please verify the input email." });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const tokens = generateJWT(user);

    // Both the access token & the refresh token are returned in JSON format for front-end authentification
    res.status(200).json(tokens);
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
}

export default UserController;
