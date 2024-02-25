import bcrypt from "bcrypt";
import generateJWT from "../utils/generateJWT.util.js";
import CoreController from "./core.controller.js";
import { UserDataMapper } from "../datamappers/index.datamapper.js";
import ApiError from "../errors/api.error.js";
import { createFailedCreationError, createMissingParamsError, createResourceNotFoundError } from "../errors/helpers.error.js";

class UserController extends CoreController {
  constructor() {
    const datamapper = new UserDataMapper();

    super(datamapper);

    this.datamapper = datamapper;
  }

  login = async (req, res) => {
    const { email: inputEmail, password: inputPassword } = req.body;

    if (!inputEmail || !inputPassword) {
      throw createMissingParamsError(req, {entityName: "user", params: ["email", "password"]});
    }

    const user = await this.datamapper.getUserByEmail(inputEmail);

    if (!user) {
      throw createResourceNotFoundError(req, {entityName: "user", targetName: "user"});  
    }

    const validPassword = await bcrypt.compare(inputPassword, user.password);

    if (!validPassword) {
      throw new ApiError(
        "The password provided is incorrect.", 
        {
          httpStatus: 401, 
          errorCode: "INCORRECT_PASSWORD", 
          path: req.path, 
          method: req.method, 
          details: "A valid password must be provided to the server. \n Please check your password to process your login request."
        }
      );
    }

    const tokens = generateJWT(user);

    if (!tokens) {
      throw new ApiError(
        "The authentication tokens could not be generated.", 
        {
          httpStatus: 500, 
          errorCode: "TOKENS_ERROR", 
          path: req.path, 
          method: req.method, 
          details: "The access & refresh tokens failed to generate although the information provided was valid. This is an internal server error."
        }
      );
    }

    const { email, username, id } = user;

    const tokensWithUser = {
      ...tokens,
      email,
      username,
      id,
    };

    res.status(200).json(tokensWithUser);
  };

  signup = async (req, res) => {
    const { password, username, email } = req.body;

    if (!password || !username || !email) {
      throw createMissingParamsError(req, {entityName: "user", params: ["username", "email", "password"]});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      throw new ApiError(
        "The password could not be encrypted.", 
        {
          httpStatus: 500, 
          errorCode: "ENCRYPTION_FAILED", 
          path: req.path, 
          method: req.method, 
          details: "The password could not be encrypted although the information provided was valid. This is an internal server error."
        }
      );
    }

    const newUser = await this.datamapper.insert({
      email,
      username,
      password: hashedPassword,
    });

    if (!newUser) {
      throw createFailedCreationError(req, {entityName: "user"});
    }

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

  deleteUser = async (req, res) => {
    return this.delete(req, res, "user", "account");
  };

}

export default UserController;
