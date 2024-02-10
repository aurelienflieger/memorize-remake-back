import bcrypt from "bcrypt";
import CoreController from "./core.controller.js";
import generateJWT from "../utils/generateJWT.util.js";
import userDataMapper from "../datamappers/index.datamapper.js";

class UserController extends CoreController {
  datamapper = userDataMapper;

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
    res.json(tokens);
  }

  async signup(req, res) {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.create(username, email, hashedPassword);

    res.json({ newUser });
  }
}

export default UserController;
