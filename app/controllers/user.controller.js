import bcrypt from "bcrypt";
import generateJWT from "../utils/generateJWT.util.js";
import CoreController from "./core.controller.js";
import { UserDataMapper } from "../datamappers/index.datamapper.js";
import ApiError from "../errors/api.error.js";

class UserController extends CoreController {
  constructor() {
    const datamapper = new UserDataMapper();

    super(datamapper);

    this.datamapper = datamapper;
  }

  login = async ({ body }, res) => {
    const { email: inputEmail, password: inputPassword } = body;

    const user = await this.datamapper.getUserByEmail(inputEmail);

    if (!user) {
      /*       throw new ApiError("Please verify the input email", { httpStatus: 400 });*/      
      throw new ApiError("Missing parameter: id", { httpStatus: 400, errorCode: "MISSING_PARAMETER", details: "The id parameter is required." });
    }

    const validPassword = await bcrypt.compare(inputPassword, user.password);

    if (!validPassword) {
      throw new ApiError("Incorrect password", { httpStatus: 400 });
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

  signup = async ({ body }, res) => {
    const { password, username, email } = body;

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
      throw new ApiError("This account does not exist.", { httpStatus: 404 });
    }

    username ? username : (username = data.username);
    email ? email : (email = data.email);

    const isModified = data.username === username && data.email === email;

    if (isModified) {
      throw new ApiError("You need to change at least one field", {
        httpStatus: 400,
      });
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
      throw new ApiError("This account does not exist.", { httpStatus: 404 });
    }

    const validPassword = await bcrypt.compare(password, data.password);

    if (!validPassword) {
      throw new ApiError("Incorrect password", { httpStatus: 400 });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const comparePasswords = await bcrypt.compare(newPassword, data.password);

    if (comparePasswords) {
      throw new ApiError(
        "Your current password and the new one must be different.",
        { httpStatus: 400 }
      );
    }

    const newAccountPassword = { ...data, password: newHashedPassword };

    const row = await this.datamapper.update(newAccountPassword);

    return res.status(200).json(row);
  };

  getByPk = async ({ params }, res) => {
    const { id } = params;

    const row = await this.datamapper.findByPkWithNoReturnedPassword(id);

    if (row === undefined) {
      throw new ApiError("This account does not exist.", { httpStatus: 404 });
    }

    return res.status(201).json(row);
  };
}

export default UserController;
